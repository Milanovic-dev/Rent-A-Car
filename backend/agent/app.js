const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const soap = require('soap');

app.use(bodyParser.json());
app.use(cors());

app.listen(8282, () => {
    console.log("Agent running on port 8282");
});

app.get('/', (req, res) => {
    res.send('This is agent backend');
});