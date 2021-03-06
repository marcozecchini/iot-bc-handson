const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');

// Connect to a node
const iota = Iota.composeAPI({
  provider: 'https://nodes.devnet.iota.org:443'
});

// Define the tail transaction hash of the bundle whose messages you want to read
var tailTransactionHash =
    'IZEMPJKJZDM9THHSOXOVAWWSAKTE9SIFIFAYMODENAVDQFFCNTRQIATXHQKWKQYZUCGTXASX99UWFR999';

if (!process.argv[2]){
    console.log("PASS AN ARGUMENT");
} else {
    tailTransactionHash = process.argv[2];
}

// Get the transaction objects in the bundle
iota.getBundle(tailTransactionHash)
  .then(bundle => {
    // Extract and parse the JSON messages from the transactions' `signatureMessageFragment` fields
    console.log(JSON.parse(Extract.extractJson(bundle)));
  })
  .catch(err => {
    console.error(err);
  });