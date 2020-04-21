const algosdk = require('algosdk');
const util = require('./util');
const mqtt = require ('mqtt');

var client  = mqtt.connect('mqtt://127.0.0.1:1883');

//connect to the broker and subscribe to topic
client.on('connect', function () {
  client.subscribe('test');
  console.log('client has subscribed successfully');
});


const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
    'X-API-Key': 'F9I45UDrFb9FuoYhohD35A2Tcfq0mnZ5cTuG81x9',
}
const postHeader = {    
    'content-type' : 'application/x-binary'
}

//instantiate the algod wrapper
let algodclient = new algosdk.Algod(token, baseServer, port); 

//Create an account or ...
// var account = algosdk.generateAccount();
// var mnemonic = algosdk.secretKeyToMnemonic(account.sk);
// console.log("Mnemonic is: " + mnemonic);

// ... recover the account 
var sk_to_mnemonic = "work matter income zebra rib assault cute beauty half praise glad teach burden midnight please piano summer absent muffin say race one trick above sense"; 
var account = algosdk.mnemonicToSecretKey(sk_to_mnemonic); 


console.log("Public Address is: " + account.addr);

// receive a mqtt message
client.on('message', function (topic, message){
    console.log("Received message from topic: " + topic)
    sendToAlgorand(message);
});
    

async function sendToAlgorand(msg) {
    try{
        await util.wait_for_money(algodclient, account.addr);
        //Get the relevant params from the algod
        let params = await algodclient.getTransactionParams();
        let note = algosdk.encodeObj(msg);

        // setting up transaction record fields
        let txn = {
            "from": account.addr,
            "to": account.addr,
            "fee": params.minFee,
            "amount": 10000,
            "firstRound": params.lastRound,
            "lastRound": params.lastRound + 1000,
            "note": note,
            "genesisID": params.genesisID,
            "genesisHash": params.genesishashb64
        };
        //sign the transaction
        let signedTxn = algosdk.signTransaction(txn, account.sk);
        //submit the transaction
        let tx = (await algodclient.sendRawTransaction(signedTxn.blob, postHeader));
        console.log("Transaction : " + tx.txId);

        await util.waitForConfirmation( algodclient, tx.txId );

        tx = (await algodclient.transactionInformation(account.addr, tx.txId));
        let decodeNote = Buffer.from(algosdk.decodeObj(tx.note)).toString();
        console.log("Note field of the transaction: " + decodeNote);

    } catch (e) {
        console.log(e);
    }
}