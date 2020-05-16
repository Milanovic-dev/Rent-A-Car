const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const service = require('./src/service');
const { registerForGateway } = require('./src/config/index');
app.use(bodyParser.json());
app.use(cors());

registerForGateway();

app.listen(4000, () => {
    console.log("==========================");
    console.log(`Auth microservice running!`);
    console.log("==========================");
});

app.get('/', (req, res) => {
    res.send('This is auth service');
});

app.get('/login', async (req, res) => {
    const result = await service.login(req.body.username, req.body.password);
    res.status(result.status).send(result.response);
});

app.get('/users', async (req, res) => {
    const result = await service.users();
    res.status(result.status).send(result.response);
});

app.post('/register', async (req, res) => {
    const result = await service.register(req.body);
    res.status(result.status).send(result.response);
});

app.get('/test/authapi', async (req, res) => {
    res.status('Found cars api');
});