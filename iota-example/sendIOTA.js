const Iota = require('@iota/core');

// Connect to a node
const iota = Iota.composeAPI({
  provider: 'https://nodes.comnet.thetangle.org:443'
});

// Define the security level of the address
const securityLevel = 2;

// The seed that will be used to generate an address
const seed = 'JMQPFM9YFERXVPYKJXJXZMXNKTQHQIRXWIATJRGDSAICLLFQOW9RQVY9GRSHGCWFKOBJHJOYBISNZGHYR';
var addr = "ECYAUAQJTWZXNNRKK9UOSMACUCHWTLENQZHJFUUCJEPWFEYONBYOPKAIFQFP9G99MYS9USYLFEI9NSFHWGNBWLCHIA"; 



// Create a wrapping function so you can use async/await
const main = async () => {

    // Define an address to which to send IOTA tokens 
    const receivingAddress = "PYR9UQ9YLWRNCHVPEJJWXKJRTVQDZNLMZKGSKDOISOMGSFQFXYTD9IBBDNZYZZQKANY9XIVQKZMCHQDGD";
  
  // Define an input transaction object
  // that sends 1 i to your new address
    const transfers = [
      {
        value: 1,
        address: receivingAddress
      }
    ];
  
    console.log('Sending 1 i to ' + receivingAddress);
  
    try {
      // Construct bundle and convert to trytes
      const trytes = await iota.prepareTransfers(seed, transfers);
      // Send bundle to node.
      const response = await iota.sendTrytes(trytes, 3, 10);
  
      console.log('Bundle sent');
      response.map(tx => console.log(tx));
    } catch (error) {
      console.log(error);
    }
  }
  
// Generate an unspent address with security level 2
// If this address is spent, this method returns the next unspent address with the lowest index
iota.getNewAddress(seed, { index: 0, securityLevel: securityLevel, total: 1 })
  .then(address => {
    console.log('Your address is: ' + address);
    // addr = address;
  })
  .then(() => {
    iota.getBalances([addr], 100)
    .then(({ balances }) => {
        console.log(addr, "balance is", balances);
    })
        .catch(err => {
    console.error(err);
    });
  })
  .then(main())
  .catch(err => {
    console.log(err)
  });