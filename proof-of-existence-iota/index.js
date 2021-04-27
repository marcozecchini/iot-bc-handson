require('regenerator-runtime');
const PoEx = require ('@iota/poex-tool');

async function publish (file) {

    const hash = PoEx.hash(file);
    
    try {
            // Attach the file hash to the Tangle in a bundle
            const bundle = await PoEx.publish({
                provider: 'https://nodes.devnet.iota.org:443',
                data: hash,
                tag: 'POEXTUTORIAL',
                address: 'HELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDD',
                seed: 'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX',
                depth: 3,
                minWeightMagnitude: 9
            });
            tailTransaction = bundle[0];
            console.log(`Attached the transaction to the Tangle with hash: ${tailTransaction.hash}`);
        } catch(error) {
            console.log(`Something went wrong: ${error}`);
    }

    // Set the IOTA node to check for the transaction
    tailTransaction.provider = 'https://nodes.devnet.iota.org:443';

    // Verifying if the file is unchanged
    const verified = PoEx.verify(tailTransaction, false, file);
    verified? console.log('File verified: The file matches the hash in the Tangle')
    : ('Something has changed. The hash in the Tangle is no longer a match.');
}
    

publish('contract.txt');