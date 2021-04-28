const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')

// const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
const mode = 'restricted'; // UNCOMMENT IF PRIVATE MODE
const sideKey = 'IOT2021'; // UNCOMMENT IF PRIVATE MODE

// Initialise MAM State
let mamState = Mam.init(provider)
mamState = Mam.changeMode(mamState, mode, sideKey); // UNCOMMENT IF PRIVATE MODE

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

const publishAll = async () => {
  const root = await publish({
    message: 'Message from Alice',
    timestamp: (new Date()).toLocaleString()
  })

  await publish({
    message: 'Message from Bob',
    timestamp: (new Date()).toLocaleString()
  })

  await publish({
    message: 'Message from Charlie',
    timestamp: (new Date()).toLocaleString()
  })

  return root
}
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

publishAll()
  .then(async root => {
    console.log(root);
    // Output syncronously function
    // await Mam.fetch(root, mode, null, logData)
    await Mam.fetch(root, mode, sideKey, logData); // UNCOMMENT IF PRIVATE MODE
  })
