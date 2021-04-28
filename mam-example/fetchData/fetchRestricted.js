const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

const mode = 'restricted'; 
const sideKey = 'IOT2021'; 
const provider = 'https://nodes.devnet.iota.org'
let root = process.argv[2]
let mamState = Mam.init(provider)
mamState = Mam.changeMode(mamState, mode, sideKey); 

//callback for each fetch
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

//Fetching async
const execute = async () => {
	await Mam.fetch(root, mode, sideKey, logData);
}

console.log('\n\nFETCHING DATA!!\n\n')
try {execute()} catch(e){console.log(e)}