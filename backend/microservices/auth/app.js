const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const service = require('./src/service');

app.use(bodyParser.json());
app.use(cors());


app.listen(4000, () => {
    console.log("==========================");
    console.log(`Auth microservice running!`);
    console.log("==========================");
});

app.get('/', (req, res) => {
    res.send('This is auth service');
});

app.get('/api/v1/login', async (req, res) => {
    const result = await service.login(req.body.username, req.body.password);
    res.status(result.status).send(result.response);
});

app.get('/api/v1/users', async (req, res) => {
    const result = await service.users();
    res.status(result.status).send(result.response);
});

app.post('/api/v1/register', async (req, res) => {
    const result = await service.register(req.body);
    res.status(result.status).send(result.response);
});