---
lang: en
page_id: sbt
permalink: /posts/sbt
title: Soul Bound Non-Fungible Token Concept & Implementation
date: 2023-07-31
categories: [Solidity, NFTs, blockchain, EVM, Ethereum, Polygon]
tags: [Solidity, NFTs, blockchain, EVM, Ethereum, Polygon]
author: Angel
description: Creating a Soul Bound Token (SBT) implementation to demonstrate a possible use case for users of a wallet software.
image: /assets/img/sbt.png
---




# How to Deploy a Soul Bound NFT on Polygon

This guide walks you through setting up, deploying, and minting a Soul Bound Token (SBT) on Polygon, with an option to bridge it to Ethereum. This project serves as an exploration of the feasibility and costs associated with minting SBTs.

## 1. Project Overview
- **Contracts Directory:** Contains the actual NFT contract.
- **Functionality:** Users can claim and burn NFTs, but only the contract owner can create claims.
- **Blockchain:** Deployed on Polygon, with bridging to Ethereum.
- **API:** Uses Alchemy for blockchain interactions.

Code found here: [https://github.com/AngelLozan/SBT](https://github.com/AngelLozan/SBT ) 
---

## 2. Prerequisites
Before proceeding, ensure you have:
- Node.js installed
- Hardhat installed (`npm install --save-dev hardhat`)
- Alchemy API Key
- Pinata account for metadata storage
- MATIC for gas fees (Testnet MATIC for Mumbai)

---

## 3. Deployment Steps

### Start Local Blockchain
Run a local Hardhat node:
```sh
npx hardhat node
```

### Deploy Contract
In a separate terminal, deploy the contract to the Mumbai testnet:
```sh
npx hardhat run scripts/deploy.js --network matic
```

### Mint NFT
Run the following command to mint an NFT:
```sh
node scripts/mint-nft.js
```

---

## 4. Metadata and Image Upload
To properly mint NFTs, follow these steps:
1. **Upload images to Pinata**
2. **Assign metadata to each image and upload the metadata folder to Pinata**

---

## 5. Testing
Run the Hardhat test suite:
```sh
npx hardhat test
```
To generate a gas report:
```sh
GAS_REPORT=true npx hardhat test
```

---

## 6. Estimating Costs
- Use the **Polygon fee tracker** to estimate deployment and minting costs.
- Sign up for **Web3 Dog Food** to receive test MATIC and experiment with minting and bridging.

---

## 7. Additional Hardhat Commands
Use the following Hardhat commands for additional functionality:
```sh
npx hardhat help
npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

---

## 8. Next Steps
- Complete the **deployment to Mumbai testnet**.
- Implement **bridging to Ethereum**.
- Write **more functions to be called by owners**.

Following using this repp, you will understand how to deploy and experiment with Soul Bound NFTs on Polygon. Let me know what you think. 

