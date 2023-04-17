const { ethers } = require('hardhat');
const mqtt = require ('mqtt');

var client  = mqtt.connect('mqtt://127.0.0.1:1883');
const address = '0xf954396618A2aa9d719E9eEB21fbF5d30ACF2846';
var accounts;

//connect to the broker and subscribe to topic
client.on('connect', async function () {
  client.subscribe('test');
  console.log('client has subscribed successfully');

  // Retrieve accounts from the local node
  accounts = await ethers.provider.listAccounts();
  console.log(accounts[0]);

});


client.on('message', function (topic, message){
    console.log("Received message from topic: " + topic)
    sendToContract(message);
});


async function sendToContract(message) {
    
    
    // Set up an ethers contract, representing our deployed Consumer instance
    const Consumer = await ethers.getContractFactory('ConsumerToken');
    const consumer = await Consumer.attach(address);

    //    
    const IoToken = await ethers.getContractFactory('IoToken');
    const ioToken = await IoToken.attach(await consumer.retrieveAddess());

    // Send a transaction to store() a new value in the Consumer
    console.log(`Balance of ${accounts[0]} before transaction: ${await ioToken.balanceOf(accounts[0])}`)
    let msg = JSON.parse(message.toString())
    let tx = await consumer.store(parseInt(msg.data.Temperature));
    await tx.wait();
    console.log(`Balance of ${accounts[0]} after transaction: ${await ioToken.balanceOf(accounts[0])}`)
    // Call the retrieve() function of the deployed Consumer contract
    const value = await consumer.retrieve();
    console.log('Box value is', value.toString());


}
  