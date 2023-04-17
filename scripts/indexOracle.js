// scripts/index.js
var APIConsumer;

async function main () {
    
    // Retrieve accounts from the local node
    const accounts = await ethers.provider.listAccounts();
    
    // Set up an ethers contract, representing our deployed Box instance
    const address = '0x43AFcC3fa59395aEb80476c0238F39f79D26Bb5f';
    APIConsumer = await ethers.getContractFactory('APIConsumer');
    const api = await APIConsumer.attach(address);

    // Send a transaction to store() a new value in the Box
    let tx = await api.requestVolumeData();
    await tx.wait();

    console.log("request sent");

    setTimeout(async () => {  console.log(await api.volume()); }, 30000);

  }



main()
  .then(() => {})
  .catch(error => {
    console.error(error);
    process.exit(1);
  });