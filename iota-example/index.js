const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const Extract = require('@iota/extract-json');
const mqtt = require ('mqtt');

var client  = mqtt.connect('mqtt://127.0.0.1:1883');

//connect to the broker and subscribe to topic
client.on('connect', function () {
  client.subscribe('test');
  console.log('client has subscribed successfully');
});

// receive a mqtt message
client.on('message', function (topic, message){
    console.log("Received message from topic: " + topic)
    sendToTangle(message);
});
// Connect to a node
const iota = Iota.composeAPI({
    provider: 'https://nodes.comnet.thetangle.org:443'
});
const depth = 3;
const minimumWeightMagnitude = 10; // how much hard is the PoW challenge

// Define a seed and an address.
// These do not need to belong to anyone or have IOTA tokens.
// They must only contain a mamximum of 81 trytes
// or 90 trytes with a valid checksum
const address =
'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
const seed = 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

function sendToTangle(msg) {
    // Define a JSON message to send.
    // This message must include only ASCII characters.
    const message = JSON.stringify({ "message": msg.toString() });
    // Convert the message to trytes
    const messageInTrytes = Converter.asciiToTrytes(message);
    // Define a zero-value transaction object
    // that sends the message to the address
    const transfers = [
        {
            value: 0,
            address: address,
            message: messageInTrytes
        }
    ];
    // Create a bundle from the `transfers` array
    // and send the transaction to the node
    iota.prepareTransfers(seed, transfers)
        .then(trytes => iota.sendTrytes(trytes, depth, minimumWeightMagnitude))
        .then(bundle => {
            // The message can be read from the Tangle, using the tail transaction hash
            const tailTransactionHash = bundle[0].hash; // NOLIVEQNRHIIRPDPHYTGJOVSGOUXVAACDNAPNTTRFNNCVNJMDZFPURTDNVTAKHPSLSJRYZGQHYBBAE999
            console.log(tailTransactionHash);
            // Get the tail transaction's bundle from the Tangle
            return iota.getBundle(tailTransactionHash)
                .then(bundle => {
                    // Get your hello world message from the transaction's `signatureMessageFragment` field and print it to the console
                    console.log("Retrieved from the Tangle ...")
                    console.log(JSON.parse(Extract.extractJson(bundle))); // TODO parse
                });
        })
        .catch(err => {
            console.error(err);
        });
}
