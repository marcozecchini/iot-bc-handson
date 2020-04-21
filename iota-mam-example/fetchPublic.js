const Mam = require('@iota/mam')
const {trytesToAscii } = require('@iota/converter')

let root = process.argv[2];

const mode = 'public'

const provider = 'https://nodes.comnet.thetangle.org:443'
// Initialise MAM State
let mamState = Mam.init(provider)
// Callback used to pass data out of the fetch
const logData = (data) => {
    console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')
    console.log('-------------------------------------------------')
}


//Fetching async
const execute = async () => {
    // Output asyncronously using "logData" callback function
    await Mam.fetch(root, mode, null, logData)

    // Output syncronously once fetch is completed
    const result = await Mam.fetch(root, mode)
    result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
}

console.log('\n\nFETCHING DATA!!\n\n')
execute().catch(err => console.log(err))