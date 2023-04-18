# IOT - BC hands-on class
Introductionary slides from professor vitaletti available at this [link](https://docs.google.com/presentation/d/1UenA4HRkTk0BsRI3MWEYIjN4JbbCbxehe3j5gPjzNGg/edit#slide=id.g11abf396aee_0_11)

## 1. Ethereum 

### 1.1 Setup a project and deploy the first smart contract

1. https://docs.openzeppelin.com/learn/developing-smart-contracts
2. https://docs.openzeppelin.com/learn/deploying-and-interacting
3. https://docs.openzeppelin.com/learn/connecting-to-public-test-networks

### 1.2 Exchanging data with money on Ethereum

We will see how to exchange data with Ether (Ethereum cryptocurrecy). To do that, we modify the `Box.sol` contract in a smart contract transfering token every time it receives a transaction (i.e., `Consumer.sol`). 

### 1.3 Exchanging data with custom token on Ethereum
We will see how to exchange data with a custom token (ERC20 compatible). To do that, we create a custom token according to [Openzeppelin documentation](https://docs.openzeppelin.com/contracts/4.x/erc20) and we modify `Consumer.sol` to transfer this token.

### 1.4 Oracle 

[Slide](https://docs.google.com/presentation/d/1UenA4HRkTk0BsRI3MWEYIjN4JbbCbxehe3j5gPjzNGg/edit#slide=id.g11abf396aee_0_48)

1. Install chainlink contracts: `npm install @chainlink/contracts --save`
2. Follows: https://docs.chain.link/any-api/get-request/examples/single-word-response/ 
4. Run `npx hardhat run --network <network-name> scripts/deploy.js` to deploy `APIConsumer.sol`  contract
5. Before invoking the `requestVolumeData` function in the `npx hardhat run --network <network-name> scripts/index.js` script, fund your contract with LINK and your account with Ether from https://faucets.chain.link/ 
    
    a. The faucet works only with Metamask. Send the LINK token from Metamask to your contract.


### 1.5 Other projects compatible with IoT nodes 

* Incubed: [Slides](https://slideslive.com/38911940), problem at slide 4/5, solution at slide 10
* MINA protocol: [Documentation](https://docs.minaprotocol.com/about-mina)

## 2. Algorand

* Blockchain trilemma? https://hackernoon.com/examining-the-blockchain-trilemma-from-algorands-prism-2kcb32qd
* What is Algorand?  https://developer.algorand.org/docs/algorand_consensus/

### 2.1 Transactions 

We will see how to send a transaction with Algorand. More information from this [page](https://developer.algorand.org/docs/build-apps/hello_world/).

Use [PureStake](https://www.purestake.com/) to connect to the Algorand Testnet network. Otherwise you can build your own node using Algorand [sandbox](https://github.com/algorand/sandbox). 

To charge your account with money go to: https://bank.testnet.algorand.network/

### 2.2 Exchanging data with money on Algorand

We will see how to exchange data with Algos (Algorand cryptocurrecy). In order to do so we will use [Atomic Transfer](https://developer.algorand.org/docs/features/atomic_transfers/), an Algorand tool, where a group of transactions are submitted as a unit and all transactions in the batch either pass or fail.

### 2.3 Exchanging data with money on Algorand with a Smart Contract

In this example (see folder `sc-algorand-example`) we will exchange data for Algos like in the previous case. However, in this example the seller won't interact with another user but with a programmable smart contract.

### 2.4 Algorand real use case scenario

* https://www.algorand.com/resources/news/planetwatch-environmental-usecase
* [Planet Watch](https://www.youtube.com/watch?v=ZRpGM2LutZ4)
