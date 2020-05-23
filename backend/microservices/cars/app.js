const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { registerForGateway }= require('./src/config/index');

registerForGateway('cars');

app.use(cors());
app.use(bodyParser.json());


app.listen(4000, () => {
    console.log("==========================");
    console.log(`Cars microservice running!`);
    console.log("==========================");
});

app.get('/', (req, res) => {
    res.send('This is car service');
});

app.get('/search', async (req,res) => {
    const result = await service.search(req.body);
    res.status(result.status).send(result.response);
});

app.get('/test', async (req,res) => {
    res.send('Success');
});
