const Mam = require('@iota/mam')
const mqtt = require('mqtt')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var client  = mqtt.connect('mqtt://127.0.0.1:1883');
var jsonData = null;

let date,i=1

const mode = 'public'
const provider = 'https://nodes.comnet.thetangle.org:443'


// Initialise MAM State
let mamState = Mam.init(provider)

//connect and subscribe to topic

client.on('connect', function () {
  client.subscribe('test');
  console.log('client has subscribed successfully');
});

function getmyjson(myjson){
	jsonData = JSON.parse(myjson);
	//console.log(jsonData);
};

// get data
client.on('message', function (topic, message){
	getmyjson(message);
	publish(JSON.parse(message));
});



// Publish to tangle
async function publish(packet) {
    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state

    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 10)

    console.log('Published', packet, '\n', "Root: ", message.root);
    
}


// Callback used to pass data out of the fetch
// const logData = (data) => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

// publishAll().then(async (root) => {
//     // Output asyncronously using "logData" callback function
//     await Mam.fetch(root, mode, null, logData)

//     // Output syncronously once fetch is completed
//     const result = await Mam.fetch(root, mode)
//     result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
//   }).catch(err => {
//     console.error(err);
// });
