const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const service = require('./src/service');
app.use(bodyParser.json({limit:'20mb'}));
app.use(cors());


const server = http.createServer(app);

server.listen(4000, () => {
    console.log("Orders service is running!");
});

app.post('/orders/create', async (req, res) => {
    let result = await service.placeOrders(req.body);
    res.status(result.status).send();
});

app.post('/orders/accept/:id', async (req, res) => {
    let result = await service.acceptOrder(req.params.id);
    res.status(result.status).send();
});

app.delete('/orders/revoke/:id', async (req, res) => {
    let result = await service.revokeOrder(req.params.id);
    res.status(result.status).send();
});


app.delete('/orders/bundles/revoke/:id', async (req, res) => {
    let result = await service.revokeBundle(req.params.id);
    res.status(result.status).send();
});


app.get('/orders', async (req, res) => {
    const result = await service.getOrders();
    res.status(200).send(result);
});


app.get('/orders/bundles', async (req, res) => {
    const result = await service.getBundles();
    res.status(200).send(result);
});


app.get('/orders/:id', async (req, res) => {
    const result = await service.getOrder(req.params.id);
    res.status(result.status).send(result.response);
});

app.get('/orders/bundles/:id', async (req, res) => {
    const result = await service.getBundle(req.params.id);
    res.status(result.status).send(result.response);
});

