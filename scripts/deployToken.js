// scripts/deploy.js
async function main () {
    // We get the contract to deploy
    const ConsumerToken = await ethers.getContractFactory('ConsumerToken');
    console.log('Deploying ConsumerToken...');
    const consumer = await ConsumerToken.deploy(1000000);
    await consumer.deployed();
    console.log('ConsumerToken deployed to:', consumer.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });