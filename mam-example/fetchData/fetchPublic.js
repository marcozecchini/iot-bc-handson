const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
let root = process.argv[2]
let mamState = Mam.init(provider)

//callback for each fetch
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

//Fetching async
const execute = async () => {
    await Mam.fetch(root, mode, null, logData)
}

console.log('\n\nFETCHING DATA!!\n\n')
execute()