/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-ethers');
const {mnemonic, apiKey} = require('./secrets.json');

module.exports = {
  networks : {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${apiKey}`,
      accounts: {mnemonic: mnemonic},
    }
  },
  solidity: "0.8.18",

};