# IOT - BC hands-on class

## 1. Algorand

* Blockchain trilemma? https://hackernoon.com/examining-the-blockchain-trilemma-from-algorands-prism-2kcb32qd
* What is Algorand?  https://developer.algorand.org/docs/algorand_consensus/

### 1.1 Transactions 

We will see how to send a transaction with Algorand. More information from this [page](https://developer.algorand.org/docs/build-apps/hello_world/).

Use [PureStake](https://www.purestake.com/) to connect to the Algorand Testnet network. Otherwise you can build your own node using Algorand [sandbox](https://github.com/algorand/sandbox). 

To charge your account with money go to: https://bank.testnet.algorand.network/

### 1.2 Exchanging data with money on Algorand

We will see how to exchange data with Algos (Algorand cryptocurrecy). In order to do so we will use [Atomic Transfer](https://developer.algorand.org/docs/features/atomic_transfers/), an Algorand tool, where a group of transactions are submitted as a unit and all transactions in the batch either pass or fail.

### 1.3 Exchanging data with money on Algorand with a Smart Contract

In this example (see folder `sc-algorand-example`) we will exchange data for Algos like in the previous case. However, in this example the seller won't interact with another user but with a programmable smart contract.

### 1.4 Algorand real use case scenario

* https://www.algorand.com/resources/news/planetwatch-environmental-usecase
* https://planetwatch.io/wp-content/uploads/2020/04/PW_White-paper_eng_Web.pdf

## 2. IOTA

From [docs](https://docs.iota.org/docs/getting-started/0.1/references/quickstart-dev-handbook#iota-and-the-internet-of-things):

> The goal of IOTA is to allow devices on the Internet of Things (IoT) to transfer data and make payments among each other.

* How IOTA works? https://blog.iota.org/the-tangle-an-illustrated-introduction-4d5eae6fe8d4

### 2.1 IOTA Tutorials

* We will go through [IOTA tutorials](https://legacy.docs.iota.org/docs/core/1.0/getting-started/get-started-js) ([Official code](https://github.com/iota-community/javascript-iota-workshop)) for Javascript

* Refound your address with [IOTA Devnet Faucet](https://faucet.devnet.iota.org/)

### 2.2 IOTA application blueprints

#### [Data Marketplace](https://legacy.docs.iota.org/docs/blueprints/0.1/data-marketplace/overview)

> Data silos make it difficult to buy and sell data among different data points. To overcome this challenge, the Data Marketplace uses Masked Authenticated Messaging (MAM) channels to open up the data silos and allow users to make micropayments of IOTA tokens to the data owners in exchange for data.

See an [application architecture](https://legacy.docs.iota.org/docs/blueprints/0.1/data-marketplace/architecture) as an example of usage. Deployed proof of concept is available [here](https://data.iota.org/#/)

* What is MAM? 

  * [Blog](https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e)
  * [Documentation](https://docs.iota.org/docs/client-libraries/0.1/mam/introduction/overview)

#### [Proof of Existence](https://legacy.docs.iota.org/docs/blueprints/0.1/doc-immutability/overview)

> Documents are an important means of transporting information and contracts between parties. Being able to reliably prove that a document has not been changed from an established state helps ensure trust between parties. As well as protect the parties. This blueprint describes a solution that automatically checks the signature of a previously signed document using the IOTA Tangle.

See an [application Architecture](https://legacy.docs.iota.org/docs/blueprints/0.1/doc-immutability/architecture) as an example of usage. We will test this [library](https://legacy.docs.iota.org/docs/tangle-certificate/1.0/getting-started/create-certificate).

#### [HIGH-MOBILITY](https://high-mobility.com/) car
We will go through this [tutorial](https://docs.high-mobility.com/guides/getting-started/node-js/) where we simultate to drive a car and publishing the data on MAM stream. Another explanation is in this [video](https://youtu.be/L-O-okg0bWk).

We will, then, see these other examples: [example1](https://www.hackster.io/l3wi/pay-per-coffee-a6e55f) from Hackster, [example2](https://www.hackster.io/fakemau5/iotair-pay-per-use-air-conditioning-bf1b92)
