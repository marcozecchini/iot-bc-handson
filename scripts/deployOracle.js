// scripts/deploy.js
async function main () {
    // We get the contract to deploy
    const APIConsumer = await ethers.getContractFactory('APIConsumer');
    console.log('Deploying APIConsumer...');
    const api = await APIConsumer.deploy();
    await api.deployed();
    console.log('Box deployed to:', api.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });