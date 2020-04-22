# IOT - BC hands-on class

## 1. Algorand

* Blockchain trilemma? https://hackernoon.com/examining-the-blockchain-trilemma-from-algorands-prism-2kcb32qd
* What is Algorand?  https://developer.algorand.org/docs/algorand_consensus/

We will see how to send a transaction with Algorand. More information from this [page](https://developer.algorand.org/docs/build-apps/hello_world/).
Use [PureStake](https://www.purestake.com/) to connect to the Algorand network. Otherwise you can build your own node using Algorand [sandbox](https://github.com/algorand/sandbox)

## 2. IOTA

From [docs](https://docs.iota.org/docs/getting-started/0.1/references/quickstart-dev-handbook#iota-and-the-internet-of-things):

> The goal of IOTA is to allow devices on the Internet of Things (IoT) to transfer data and make payments among each other.

* How IOTA works? https://blog.iota.org/the-tangle-an-illustrated-introduction-4d5eae6fe8d4

* Refound your address with [IOTA Comnet Faucet](https://faucet.comnet.einfachiota.de/#/)

* We will go through [IOTA tutorials](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/get-started) for Javascript

Note that devnet is not working anymore. Change all the ...

``` javascript
const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
});
```

with ... 

``` javascript
const iota = Iota.composeAPI({
   provider: 'https://nodes.comnet.thetangle.org:443'
});
```

## 3.IOTA + MAM

* What is MAM? https://blog.iota.org/introducing-masked-authenticated-messaging-e55c1822d50e

## 4.IOTA real use case scenario

We will go through the [tutorial](https://high-mobility.com/5LZy/blueprints/QYLJ/charging-payment-blueprint) where we simultate to charge an electric car and paying in IOTA for the charging.

We will, then, see this other [example](https://www.hackster.io/l3wi/pay-per-coffee-a6e55f) from Hackster.

## 5.Algorand real use case scenario

* https://www.algorand.com/resources/news/planetwatch-environmental-usecase
* https://planetwatch.io/wp-content/uploads/2020/04/PW_White-paper_eng_Web.pdf