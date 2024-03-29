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
    const address = '0xcD59F74000211071bC16F2d93CC8e17a9B687e8D';
    const Box = await ethers.getContractFactory('Box');
    const box = await Box.attach(address);

    // Send a transaction to store() a new value in the Box
    let msg = JSON.parse(message.toString())
    let tx = await box.store(parseInt(msg.data.Temperature));
    await tx.wait();

    // Call the retrieve() function of the deployed Box contract
    const value = await box.retrieve();
    console.log('Box value is', value.toString());
}
  