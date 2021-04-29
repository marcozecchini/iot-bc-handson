const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

const mode = 'restricted'; 
const sideKey = 'VERYSECRETKEY'; 
const provider = 'https://nodes.devnet.iota.org'
let root = process.argv[2]
let mamState = Mam.init(provider)
mamState = Mam.changeMode(mamState, mode, sideKey); 


//Fetching async
const execute = async (r) => {
	const result = await Mam.fetch(r, mode, sideKey);
	result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))

	setTimeout(10000, execute(result.nextRoot))
}

console.log('\n\nFETCHING DATA!!\n\n')
try {execute(root)} catch(e){console.log(e)}