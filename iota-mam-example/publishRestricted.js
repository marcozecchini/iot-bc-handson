const Mam = require('@iota/mam')
const mqtt = require('mqtt')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
var client  = mqtt.connect('mqtt://127.0.0.1:1883');
var jsonData = null;

const provider = 'https://nodes.comnet.thetangle.org:443'

const mode = 'restricted'
const sideKey = 'IOT2020'

// Initialise MAM State
let mamState = Mam.init(provider)

// Set channel mode
mamState = Mam.changeMode(mamState, mode, sideKey)
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
  
