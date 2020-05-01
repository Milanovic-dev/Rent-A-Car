const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('This is search service');
});

app.listen(4000, () => {
    console.log(`Search microservice running!`);
});