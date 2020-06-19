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
    let result = await service.placeOrders(req.body, req.headers.authorization);
    res.status(result.status).send();
});

app.post('/orders/accept/:id', async(req, res) => {
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

app.get('/orders/requests', async (req, res) => {
    let result = await service.getOrderRequests(req.headers.authorization);
    res.status(result.status).send(result.response);
})

app.get('/orders/bundles/requests', async (req, res) => {
    let result = await service.getBundleRequests(req.headers.authorization);
    res.status(result.status).send(result.response);
})

app.get('/orders', async (req, res) => {
    const result = await service.getOrders(req.headers.authorization);
    res.status(result.status).send(result.response);
});


app.get('/orders/bundles', async (req, res) => {
    const result = await service.getBundles(req.headers.authorization);
    res.status(result.status).send(result.response);
});


app.get('/orders/bundles/:id', async (req, res) => {
    const result = await service.getBundle(req.params.id);
    res.status(result.status).send(result.response);
});

app.post('/orders/cart/add/:id', async(req, res) => {
    let result = await service.addToCart(req.params.id, req.headers.authorization);
    res.status(result.status).send();
});

app.post('/orders/cart/remove/:id', async(req, res) => {
    let result = await service.removeFromCart(req.params.id, req.headers.authorization);
    res.status(result.status).send();
});

app.get('/orders/cart', async(req, res) => {
    let result = await service.getCart(req.headers.authorization);
    res.status(result.status).send(result.response);
});

app.get('/orders/cart/size', async(req, res) => {
    let result = await service.getCartSize(req.headers.authorization);
    res.status(result.status).send(result.response);
});

app.get('/orders/:id', async (req, res) => {
    const result = await service.getOrder(req.params.id);
    res.status(result.status).send(result.response);
});

