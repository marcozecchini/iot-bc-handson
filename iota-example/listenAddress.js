const iotaLibrary = require('@iota/core')
const Converter = require('@iota/converter')

const iota = iotaLibrary.composeAPI({
    provider: 'https://nodes.comnet.thetangle.org:443'
})

const address =
  'ECYAUAQJTWZXNNRKK9UOSMACUCHWTLENQZHJFUUCJEPWFEYONBYOPKAIFQFP9G99MYS9USYLFEI9NSFHWGNBWLCHIA'

iota
  .findTransactionObjects({ addresses: [address] })
  .then(response => {
    const msg = response
      .sort((a, b) => a.currentIndex - b.currentIndex)
      .map(tx => tx.signatureMessageFragment)
      .forEach(element => {
        console.log("Decoded message", Converter.trytesToAscii(element+'9'), "\n------------------------" );
      });

    // console.log('Encoded message:')
    // console.log(msg)

    //Convert trytes to plan text
    // const data = Converter.trytesToAscii(msg)
    // console.log('Decoded message:')
    // console.log(data)
  })
  .catch(err => {
    console.error(err)
  })