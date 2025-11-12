# LongToken (LGT) ERC-20 TOKEN PROJECT

A fully functional ERC20 token smart contract deployed on the Ethereum testnet (Sepolia).This contract implements a capped, burnable ERC20 token with an automated miner reward system.

**Deployed Contract Address:** 0x4f8233Ddb735dDFA8B7122B2936f414B61e30eF2

**Etherscan Link:** https://sepolia.etherscan.io/token/0x4f8233Ddb735dDFA8B7122B2936f414B61e30eF2

## 🧠Technologies Used

### Blockchain

- Ethereum (Sepolia Testnet)
  
### Smart Contract Language
- Solidity
  
### Development Tools
- Hardhat
- OpenZeppelin Contracts

### ✨ Features
- ERC20 Capped Supply
- Burnable Tokens (users can destroy their tokens)
- Automatic Miner Reward System (mints rewards to block miners on transfers)
- Owner-controlled block reward adjustment
- Fully tested and deployable with Hardhat

## 🧩 Getting Started with Testing

### 1️⃣ Clone the Repository

In your terminal, run:

```git clone https://github.com/your-username/LongToken-smartcontract.git```

Then navigate into the cloned folder:

```cd LongToken-smartcontract```

Install dependencies:

```npm install```

### 🧠 Interact with the Smart Contract

You can interact with this smart contract in two ways:

**Option A: Use the Already Deployed Contract**

- Go to [Remix IDE](https://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.30+commit.73712a01.js) in your browser.

- In the File Explorer, click the Create New File icon.

- Name the file Longtoken.sol.

- Copy and paste the full contract code from this repository into that file.

- Go to the Solidity Compiler tab:

  - Select compiler version 0.8.20

  - Click Compile Longtoken.sol


- Go to the Deploy & Run Transactions tab:


  - Under Environment, select Injected Provider – MetaMask

  - Connect MetaMask to the Sepolia network


In the At Address field, paste:

```
 0x4f8233Ddb735dDFA8B7122B2936f414B61e30eF2
```

- Click At Address

Your deployed contract will appear under Deployed Contracts in Remix. Now you can start interacting with the functions.

**Option B: Redeploy the Smart Contract**

You can deploy your own instance of LongToken using Hardhat.

- Create a .env file in the root directory (same level as hardhat.config.js):

```
PRIVATE_KEY=your_sepolia_wallet_private_key
INFURA_PROJECT_ID=your_infura_project_id
ETHERSCAN_API_KEY=your_etherscan_api_key
```
 ⚠️ Important: Never commit your .env file to GitHub. Add it to .gitignore.

- Deploy the contract:

 ```npx hardhat run scripts/deploy.js --network sepolia```

After deployment, you’ll get a new contract address in your terminal. You can then follow Option A steps using your new address.

## 🧾 Example Interactions

### 1️⃣ Check Owner
- Click owner()

You’ll see the wallet address that deployed the contract.

### 2️⃣ Transfer Tokens
- Call transfer(address to, uint256 amount)

- MetaMask will ask for confirmation.

- After success, check balances using balanceOf(address).

### 3️⃣ Change Block Reward (Owner Only)
- Call setBlockReward(uint256 reward)

- Enter the reward amount (in whole tokens).

- MetaMask will confirm the transaction.

**Smart Contract Developer:** Ukpai Precious

**Network:** Ethereum (Sepolia)

**Token Name:** LongToken (LGT)
