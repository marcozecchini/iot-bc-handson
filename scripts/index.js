const mqtt = require ('mqtt');

var client  = mqtt.connect('mqtt://127.0.0.1:1883');


//connect to the broker and subscribe to topic
client.on('connect', async function () {
  client.subscribe('test');
  console.log('client has subscribed successfully');

  // Retrieve accounts from the local node
  const accounts = await ethers.provider.listAccounts();
  console.log(accounts);

});


client.on('message', function (topic, message){
    console.log("Received message from topic: " + topic)
    sendToContract(message);
});


async function sendToContract(message) {
    
    // Set up an ethers contract, representing our deployed Box instance
    const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const Box = await ethers.getContractFactory('Box');
    const box = await Box.attach(address);

    // Send a transaction to store() a new value in the Box
    let msg = JSON.parse(message.toString())
    await box.store(parseInt(msg.data.Temperature));

    // Call the retrieve() function of the deployed Box contract
    const value = await box.retrieve();
    console.log('Box value is', value.toString());
}
  