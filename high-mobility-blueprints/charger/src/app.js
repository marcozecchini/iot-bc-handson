import HMKit from 'hmkit'
import { composeAPI } from '@iota/core'
import { generateAddress } from '@iota/core'

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
})

const iota = composeAPI({
  provider: 'https://nodes.comnet.thetangle.org:443'
})

// Initialize the High Mobility SDK with our Cloud App Client Certificate
// FIXME: Change to your own HMKit Client Certificate
const hmkit = new HMKit(
  "dGVzdN/pqZTc4SBbVrCNLgshNVHe8aPqZtB0kPjNzP6tQKWkHd1ahOTBZ5HZE3rVhi/kUPFjYXTaJaZ3DiwFsvmvGEqYOjCsqFTlDH7BGVZm2ZweIOMWbKfLoV2uFHav1NKWNCCONQ/uHR5I9SfAONK90ukvBZZYyTOCKNHknES8sHnFXK5/KWBQ+7gJzV3lFyGpqS441EBp",
  "9SwqaZryNgRxCy8X+u+XwRi+ssEYlVVVd08Y4BiEcGE="
);


// The IOTA seed for your vehicle is defined here
// FIXME: Check the readme for information on how to generate a seed + get tokens
const vehicleSeed = 'QRSGEWIDNYJPPCUKBMSVLZOTMLNEJPAQMOXJATGCTQNPJYDBWARB99CXQZYCBSNZJALYXPXDHOOLPHAMT'

// The access certificate for our vehicle simulator is defined here
// FIXME: Change to your own Vehicle Access Token
const accessTokenVehicle = '3c279690-8550-4477-bf95-06946e7f0b34'

// The IOTA seed for your vehicle is defined here
// FIXME: Check the readme for information on how to generate a seed
const chargerSeed = 'URZKIZJZ9LT9ST9JGKEHPXOIZEMFSF9SCUKKPBATSO9KH9OFNRYNGLLVZMTUCMUJVRDJERWEFNFRM9MBX'

// The access certificate for our charger simulator is defined here
// FIXME: Change to your own Charger Access Token
const accessTokenCharger = 'da5cfb1d-ffc5-4aff-be0e-db3f69a8a926'

class HMVehicle {
  constructor (seed) {
    this.seed = seed
  }

  async initHMCertificate (accessTokenVehicle) {
    this.accessCertificate = await hmkit.downloadAccessCertificate(
      accessTokenVehicle
    )
  }

  async sendTransaction (value, address) {
    sendIOTATransactionWithSeedAndValueAndAddress(this.seed, value, address)
  }

  async startCharging () {
    try {
      await hmkit.telematics.sendCommand(
        this.accessCertificate.getSerial(),
        hmkit.commands.ChargingCommand.startCharging()
      )
    } catch (e) {
      console.log(e)
    }
  }
}

class HMCharger {
  constructor (seed) {
    this.seed = seed
  }

  async initHMCertificateCharger (accessTokenCharger) {
    this.accessCertificate = await hmkit.downloadAccessCertificate(
      accessTokenCharger
    )
  }

  async getReceiveAddress () {
    // Generates an address with index 0.
    // Please make sure you generate a new receive address once you've spent
    // tokens from the old one! Never reuse an address that you've sent tokens from.
    // Preferably use iota.getNewAddress(seed, [options], [callback]) to generate new addresses.
    // For more information about IOTA addresses and seeds please see:
    // https://docs.iota.org/introduction/iota-token/seeds-private-keys-accounts
    this.currentAddress = generateAddress(this.seed, 0)
    return this.currentAddress
  }

  async prepareForPayment () {
    this.balance = await this.checkBalance()
  }

  async checkBalance () {
    let response = await iota.getBalances([this.currentAddress], 100)
    return response.balances[0]
  }

  async authenticate () {
    try {
      await hmkit.telematics.sendCommand(
        this.accessCertificate.getSerial(),
        hmkit.commands.HomeChargerCommand.authenticate()
      )
    } catch (e) {
      console.log(e)
    }
  }

  async checkForPaymentConfirmation (callback) {
    try {
      let initialBalance = this.balance
      var currentBalance = 0
      // check whether charger balance has increased every 5 seconds for
      // 20 min max
      for (var i = 0; i < 240; i++) {
        currentBalance = await this.checkBalance()

        if (currentBalance > initialBalance) {
          // authenticate will also set the IOTA charger to 'charging'
          await this.authenticate()
          return callback(null)
        }
        // 5 second delay
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }
      return callback('Error: Timeout. Please check if transaction is pending and promote / reattach.')
    } catch (e) {
      return callback(e)
    }
  }
}

async function app () {
  try {
    // init vehicle object
    var vehicle = new HMVehicle(vehicleSeed)
    await vehicle.initHMCertificate(accessTokenVehicle)
    console.log('Vehicle initialized.')

    // init charger object
    var charger = new HMCharger(chargerSeed)
    await charger.initHMCertificateCharger(accessTokenCharger)
    console.log('Charger initialized.')

    // get receive address for charger
    let chargerAddress = await charger.getReceiveAddress()

    console.log(`Charger address: ${chargerAddress}`)

    console.log('Preparing payment.')

    // prepare for payment: requesting initial balance for charger
    await charger.prepareForPayment()

    console.log('Sending transaction.')

    // send 1 iota from vehicle to charger
    vehicle.sendTransaction(1, chargerAddress)

    console.log('Checking for payment confirmation.')

    charger.checkForPaymentConfirmation((error) => {
      if (!error) {
        console.log('Payment confirmed.')
        console.log('Starting charging process.')

        vehicle.startCharging()
      } else {
        console.log(error)
      }
    })
  } catch (e) {
    console.log(e)
  }
}

function sendIOTATransactionWithSeedAndValueAndAddress (seed, value, address) {
  const iota = composeAPI({
   provider: 'https://nodes.comnet.thetangle.org:443'
  })
  // Array of transfers which defines transfer recipients and value transferred in IOTAs.
  const transfers = [{
    address: address,
    value: value,
    tag: 'HIGHMOBILITY', // optional tag of `0-27` trytes
    message: '' // optional message in trytes
  }]

  const depth = 3
  // Please note that minWeightMagnitude can be different on the main net
  const minWeightMagnitude = 10

  iota.prepareTransfers(seed, transfers)
    .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
    .then(bundle => {
      console.log(`Published transaction with tail hash: ${bundle[0].hash}`)
    })
    .catch(err => {
      console.log(err)
    })
}

// Run your app
app()
