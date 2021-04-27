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

### 1.3 Algorand real use case scenario

* https://www.algorand.com/resources/news/planetwatch-environmental-usecase
* https://planetwatch.io/wp-content/uploads/2020/04/PW_White-paper_eng_Web.pdf

## 2. IOTA

From [docs](https://docs.iota.org/docs/getting-started/0.1/references/quickstart-dev-handbook#iota-and-the-internet-of-things):

> The goal of IOTA is to allow devices on the Internet of Things (IoT) to transfer data and make payments among each other.

* How IOTA works? https://blog.iota.org/the-tangle-an-illustrated-introduction-4d5eae6fe8d4

### 2.1 IOTA Tutorials

* We will go through [IOTA tutorials](https://legacy.docs.iota.org/docs/core/1.0/getting-started/get-started-js) ([Official code](https://github.com/iota-community/javascript-iota-workshop)) for Javascript

* Refound your address with [IOTA Comnet Faucet](https://faucet.comnet.einfachiota.de/#/)

### 2.2 IOTA application blueprints

#### [Data Marketplace](https://legacy.docs.iota.org/docs/blueprints/0.1/data-marketplace/overview)

> Data silos make it difficult to buy and sell data among different data points. To overcome this challenge, the Data Marketplace uses Masked Authenticated Messaging (MAM) channels to open up the data silos and allow users to make micropayments of IOTA tokens to the data owners in exchange for data.

Deployed proof of concept is available [here](https://data.iota.org/#/)

* What is MAM? 

  * [Blog](https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e)
  * [Documentation](https://docs.iota.org/docs/client-libraries/0.1/mam/introduction/overview)

#### [Proof of Existence]

### 2.3 IOTA and electric car

We will go through this [tutorial](https://high-mobility.com/5LZy/blueprints/QYLJ/charging-payment-blueprint) where we simultate to charge an electric car and paying in IOTA for the charging. Another example with High Mobility is in this [video](https://youtu.be/L-O-okg0bWk).

We will, then, see these other examples: [example1](https://www.hackster.io/l3wi/pay-per-coffee-a6e55f) from Hackster, [example2](https://www.hackster.io/fakemau5/iotair-pay-per-use-air-conditioning-bf1b92)
