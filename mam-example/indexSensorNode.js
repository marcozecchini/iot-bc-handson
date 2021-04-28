const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const mqtt = require ('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1:1883');

// const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
var mode = 'public';
let mamState = Mam.init(provider);
let sideKey = undefined;

switch(process.argv[2]){								//Getting the mode of the stream (Public:1, Private:2, Restricted: 3)
	case '1': mode='public';break;
	case '2': mode='private';break;
	case '3': mode='restricted';break;
	default: mode='public';
}
if (mode === 'restricted') { 
	sideKey = process.argv[3];
	mamState = Mam.changeMode(mamState, mode, sideKey);
}
else if (mode === 'private') { 
	mamState = Mam.changeMode(mamState, mode, undefined);
}
//connect and subscribe to topic
client.on('connect', function () {
  client.subscribe('test');
  console.log('MQTT client has subscribed successfully');
});


// get data
client.on('message', function (topic, message) {
  send(message);
});

let i=1

//Create a JSON as message
async function send(msg){
	try{
		console.log('Start sending data to Tangle...')
		console.log('Message: %s',msg)
		console.log('--------------------------------------------------------------------------------------------------------------------')

		let root = await publish({
			message: msg,
			timestamp: (new Date()).toLocaleString()
		})

		console.log('Root: %s',root)
	} catch (e) {console.log(e)}

}

// Publish to tangle
const publish = async packet => {
    // Create MAM Payload - STRING OF TRYTES
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)

    // Save new mamState
    mamState = message.state

    // Attach the payload
    await Mam.attach(message.payload, message.address, 3, 9)

    console.log('Published', packet, '\n');
    return message.root
}
