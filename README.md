# evm inscription minting tool

# evm 비문 민팅 도구

## 🛠 환경 설정

### Step 1: nodejs 설치

```bash
https://nodejs.org/en
```

```bash
node -v
npm -v
```

### Step 2: 소스 코드 다운로드

git clone 명령어를 통해 소스코드를 다운 가능. (git이 없다면 설치 필요할 것임)

```bash
git clone https://github.com/suropark/evm-inscription-mint.git

cd evm-inscription-mint
```

Windows 컴퓨터에 git이 설치되어 있지 않은 경우 먼저 아래 웹사이트에 접속하여 git 소프트웨어를 다운로드하여 설치하세요.

```bash
https://gitforwindows.org
```

### Step 3: 현재 소스 코드 폴더 안의 config.js.example 이름을 config.js 파일로 바꿉니다.

```bash
cp config.js.example config.js
```

### Step 4: config.js 파일 수정

```javascript
const config = {
  // 반복 횟수 설정
  repeatCount: 1,

  // 현재 가스 기준 가스비 얼마나 증가시킬지 20%?
  increaseGas: 1.2,

  // 지갑의 개인 키
  privateKey: "",

  // 비문 json 데이터
  tokenJson: 'data:,{"p":"fair-20","op":"mint","tick":"fair","amt":"1000"}',

  // RPC노드 (evm 체인과 호환 가능)
  // eth =>  https://mainnet.infura.io/v3
  // arb => https://arb1.arbitrum.io/rpc
  // polygon => https://polygon-rpc.com
  // op => https://mainnet.optimism.io
  // linea => https://mainnet.infura.io/v3
  // scroll => https://rpc.scroll.io
  // zks => https://mainnet.era.zksync.io
  rpcUrl: "https://arb1.arbitrum.io/rpc",
};
```

### Step 5: 패키지 설치

```bash
npm i
```

or

```bash
yarn install
```

### Step 6: 민팅 실행

```shell
node index.js
```

or

```shell
yarn start
```

or

```shell
npm run start
```
