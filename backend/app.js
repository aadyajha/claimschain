const express = require('express');
const aptosService = require('./services/aptosService');
const app = express();

app.use(express.json());

// Create insurance policy
app.post('/policy/create', async (req, res) => {
    const { account, coverageAmount, premium } = req.body;
    try {
        const txHash = await aptosService.createPolicy(account, coverageAmount, premium);
        res.status(200).json({ txHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit insurance claim
app.post('/claim/submit', async (req, res) => {
    const { account } = req.body;
    try {
        const txHash = await aptosService.submitClaim(account);
        res.status(200).json({ txHash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('ClaimChain backend running on port 3000');
});
