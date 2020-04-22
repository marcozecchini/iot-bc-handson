async function wait_for_money( algod_client, addr ){
    console.log("Wait " + addr +" receiving the money ...");
    while(true){
        account_info = await algod_client.accountInformation(addr);
        if (account_info["amount"] > 0) {
            console.log("Account balence now is:" + account_info["amount"]);
            return
        }
        await sleep(3000);
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   



async function waitForConfirmation (algodclient, txId) {
    let lastround = (await algodclient.status()).lastRound;
    while (true) {
        const pendingInfo = await algodclient.pendingTransactionInformation(txId);
        if (pendingInfo.round !== null && pendingInfo.round > 0) {
            //Got the completed Transaction
            console.log("Transaction " + pendingInfo.tx + " confirmed in round " + pendingInfo.round);
            break;
        }
        lastround++;
        await algodclient.statusAfterBlock(lastround);
    }
};

module.exports = { wait_for_money, waitForConfirmation }