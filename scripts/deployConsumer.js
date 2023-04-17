// scripts/deploy.js
async function main () {
    // We get the contract to deploy
    const Consumer = await ethers.getContractFactory('Consumer');
    console.log('Deploying Box...');
    const consumer = await Consumer.deploy();
    await consumer.deployed();
    console.log('Box deployed to:', consumer.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });