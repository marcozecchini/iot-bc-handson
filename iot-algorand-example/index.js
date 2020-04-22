const algosdk = require('algosdk');
const util = require('./util');
const mqtt = require ('mqtt');
const fs = require('fs');

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

var selling_account = algosdk.generateAccount();
var selling_mnemonic = algosdk.secretKeyToMnemonic(selling_account.sk);
console.log("Selling Mnemonic is: " + selling_mnemonic);


var consumer_account = algosdk.generateAccount();
var consumer_mnemonic = algosdk.secretKeyToMnemonic(consumer_account.sk);
console.log("\nConsumer Mnemonic is: " + consumer_mnemonic);

// ... recover the account 
// var sk_to_mnemonic = "work matter income zebra rib assault cute beauty half praise glad teach burden midnight please piano summer absent muffin say race one trick above sense"; 
// var account = algosdk.mnemonicToSecretKey(sk_to_mnemonic); 


console.log("\nPublic Selling Address is: " + selling_account.addr);
console.log("\nPublic Consumer Address is: " + consumer_account.addr);

// receive a mqtt message
client.on('message', function (topic, message){
    console.log("Received message from topic: " + topic)
    atomicIoTDataExchange(message);
});
    

async function atomicIoTDataExchange(msg) {
    try{
        await util.wait_for_money(algodclient, selling_account.addr);
        await util.wait_for_money(algodclient, consumer_account.addr);
        //Get the relevant params from the algod
        let params = await algodclient.getTransactionParams();
        let note = algosdk.encodeObj(msg);

        // setting up transaction record fields
        let txn1 = algosdk.makePaymentTxn(selling_account.addr, consumer_account.addr, params.minFee,
            0, undefined, params.lastRound, params.lastRound + 1000, note, params.genesishashb64, params.genesisID)
        // setting up transaction record fields
        let txn2 = algosdk.makePaymentTxn(consumer_account.addr, selling_account.addr, params.minFee,
            1000, undefined, params.lastRound, params.lastRound + 1000, note, params.genesishashb64, params.genesisID)
        // Store both transactions
        let txns = [txn1, txn2];

        // Group both transactions
        let txgroup = algosdk.assignGroupID(txns);

        // Sign each transaction in the group with
        // correct key
        let signed = []
        signed.push( txn1.signTxn( selling_account.sk ) )
        signed.push( txn2.signTxn( consumer_account.sk ) )

        let tx = (await algodclient.sendRawTransactions(signed, postHeader));
        console.log("Transaction : " + tx.txId);

        // Wait for transaction to be confirmed
        await util.waitForConfirmation(algodclient, tx.txId)
    } catch (e) {
        console.log(e);
    }
}