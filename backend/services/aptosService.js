const { AptosClient, AptosAccount, FaucetClient } = require('aptos');

const NODE_URL = 'https://fullnode.devnet.aptoslabs.com';
const FAUCET_URL = 'https://faucet.devnet.aptoslabs.com';

const aptosClient = new AptosClient(NODE_URL);
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

// Create policy
async function createPolicy(account, coverageAmount, premium) {
    const payload = {
        type: 'entry_function_payload',
        function: `${account}::ClaimChain::create_policy`,
        arguments: [coverageAmount, premium],
        type_arguments: []
    };

    const txnRequest = await aptosClient.generateTransaction(account, payload);
    const signedTxn = await aptosClient.signTransaction(account, txnRequest);
    const transactionRes = await aptosClient.submitTransaction(signedTxn);
    await aptosClient.waitForTransaction(transactionRes.hash);

    return transactionRes.hash;
}

// Submit claim
async function submitClaim(account) {
    const payload = {
        type: 'entry_function_payload',
        function: `${account}::ClaimChain::submit_claim`,
        arguments: [],
        type_arguments: []
    };

    const txnRequest = await aptosClient.generateTransaction(account, payload);
    const signedTxn = await aptosClient.signTransaction(account, txnRequest);
    const transactionRes = await aptosClient.submitTransaction(signedTxn);
    await aptosClient.waitForTransaction(transactionRes.hash);

    return transactionRes.hash;
}

module.exports = {
    createPolicy,
    submitClaim
};
