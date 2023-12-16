const { ethers } = require("ethers");
const config = require("./config");

// rpc 프로바이더 설정  https://chainlist.org 에서 찾아서 넣어주면 됨
const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);

// 민팅할 개인 지갑 설정
const privateWallet = new ethers.Wallet(config.privateKey);
const wallet = privateWallet.connect(provider);

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 문자열을 16진수로 변환
const convertToHexa = (str = "") => {
  const res = [];
  const { length: len } = str;
  for (let n = 0, l = len; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    res.push(hex);
  }
  return `0x${res.join("")}`;
};

// 논스 가져오기
async function getCurrentNonce(wallet) {
  try {
    const nonce = await wallet.getTransactionCount("pending");
    console.log("Nonce:", nonce);
    return nonce;
  } catch (error) {
    console.error("Error fetching nonce:", error.message);
    throw error;
  }
}

//  가스 가격 가져오기
async function getGasPrice() {
  const gasPrice = await provider.getGasPrice();
  return gasPrice;
}

// 가스 리밋 가져오기
async function getGasLimit(hexData, address) {
  const gasLimit = await provider.estimateGas({
    to: address,
    value: ethers.utils.parseEther("0"),
    data: hexData,
    from: wallet.address,
  });

  return gasLimit.toNumber();
}

// 트랜잭션
async function sendTransaction(nonce) {
  const hexData = convertToHexa(config.tokenJson.trim());
  // 현재 가스 가격 가져오기
  const currentGasPrice = await getGasPrice();
  // 가스비 올리기
  const gasMultiple = parseInt(String(config.increaseGas * 100));
  const increasedGasPrice = currentGasPrice.div(100).mul(gasMultiple);

  // 주소 체크
  let address = await wallet.getAddress();
  if (config.receiveAddress !== "") {
    address = config.receiveAddress;
  }
  // 가스 리밋
  const gasLimit = await getGasLimit(hexData, address);
  // 지불할 가격 (보통 0)
  const payPrice = config.payPrice;

  const transaction = {
    to: wallet.address,
    value: ethers.utils.parseEther(payPrice),
    data: hexData,
    gasPrice: increasedGasPrice,
    gasLimit: gasLimit,

    // 원래 논스 값 있음
    // nonce: nonce,
  };
  try {
    const tx = await wallet.sendTransaction(transaction);
    console.log(`Transaction with nonce ${nonce} hash:`, tx.hash);
  } catch (error) {
    console.error(`Error in transaction with nonce ${nonce}:`, error.message);
  }
}

// 트랜잭션 전송
async function sendTransactions() {
  const currentNonce = await getCurrentNonce(wallet);
  const sleepTime = config.sleepTime;

  for (let i = 0; i < config.repeatCount; i++) {
    const gasPrice = await getGasPrice();
    await sendTransaction(currentNonce + i, gasPrice);

    // 설정한 시간만큼 대기
    await sleep(sleepTime);
  }
}

sendTransactions();
