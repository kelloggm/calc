const express = require('express');
const cors = require('cors');
const { calculate } = require('./logic');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
    const { expression } = req.body;
    console.log(`Received expression: "${expression}"`);
    const result = calculate(expression);
    console.log(`Calculation result: "${result}"`);
    res.json({ result });
});

app.listen(PORT, () => {
    console.log(`Backend calculator server running at http://localhost:${PORT}`);
});
