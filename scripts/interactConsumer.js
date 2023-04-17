const mqtt = require ('mqtt');

var client  = mqtt.connect('mqtt://127.0.0.1:1883');
const address = '0x2585B80Bf65b7d627254BadF441f76cdD588c23b';
var accounts;

//connect to the broker and subscribe to topic
client.on('connect', async function () {
  client.subscribe('test');
  console.log('client has subscribed successfully');

  // Retrieve accounts from the local node
  accounts = await ethers.provider.listAccounts();
  console.log(accounts[0]);

  const signer = await ethers.getSigner(accounts[0])
  signer.sendTransaction({
    to: address,
    value: ethers.utils.parseEther("0.001"), })
});


client.on('message', function (topic, message){
    console.log("Received message from topic: " + topic)
    sendToContract(message);
});


async function sendToContract(message) {
    
    // Set up an ethers contract, representing our deployed Box instance
    const Consumer = await ethers.getContractFactory('Consumer');
    const consumer = await Consumer.attach(address);

    // Send a transaction to store() a new value in the Box
    console.log(`Balance of ${address} before transaction: ${await ethers.provider.getBalance(address)}`)
    let msg = JSON.parse(message.toString())
    let tx = await consumer.store(parseInt(msg.data.Temperature));
    await tx.wait();
    console.log(`Balance of ${address} after transaction: ${await ethers.provider.getBalance(address)}`)
    // Call the retrieve() function of the deployed Box contract
    const value = await consumer.retrieve();
    console.log('Box value is', value.toString());


}
  