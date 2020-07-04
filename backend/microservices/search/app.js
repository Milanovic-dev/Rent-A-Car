const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

const service = require('./src/service');

app.listen(4000, () => {
    console.log(`Search microservice running!`);
});

app.get('/', (req, res) => {
    res.send('This is search service');
});

app.post('/search/cars', async (req, res) => {
    let result = await service.search(req.body);
    res.status(result.status).send(result.response);
});

app.get('/search/getForm', async (req, res) => {
    let result = await service.getForm();
    res.status(result.status).send(result.response);
});

