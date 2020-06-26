const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const service = require('./src/service');
const device = require('express-device');
const {log, logCustom} = require('./src/security/logger')
app.use(bodyParser.json({limit:'20mb'}));
app.use(cors());
app.use(device.capture());
app.use((req, res, next) => {
    const auth = req.headers.authorization;
    
    if(auth){
        const token = auth.split(' ')[1];
        
        if(!token) req.headers.authorization = undefined;
        if(token == null) req.headers.authorization = undefined;
        if(token == 'null') req.headers.authorization = undefined;
    }
    
    next();
});

const server = http.createServer(app);

server.listen(4000, () => {
    console.log("Orders service is running!");
});

app.get('/orders/logs', service.generatePermissionMiddleware('*'),  async(req, res) => {
    const log = 'logs.log';
    res.download(log);
});

app.post('/orders/create', service.generatePermissionMiddleware('orders-permission'), async (req, res) => {
    let result = await service.placeOrders(req.body, req.headers.authorization);
    log(req, result.status);
    res.status(result.status).send();
});

app.post('/orders/accept/:id', service.generatePermissionMiddleware('orders-permission'), async(req, res) => {
    let result = await service.acceptOrder(req.params.id);
    log(req, result.status);
    res.status(result.status).send();
});

app.post('/orders/decline/:id', service.generatePermissionMiddleware('orders-permission'), async(req, res) => {
    let result = await service.declineOrder(req.params.id);
    log(req, result.status);
    res.status(result.status).send();
});

app.post('/orders/bundles/accept/:id', service.generatePermissionMiddleware('orders-permission'), async(req, res) => {
    let result = await service.acceptBundle(req.params.id);
    log(req, result.status);
    res.status(result.status).send();
});

app.post('/orders/bundles/decline/:id', service.generatePermissionMiddleware('orders-permission'), async(req, res) => {
    let result = await service.declineBundle(req.params.id);
    log(req, result.status);
    res.status(result.status).send();
});


app.delete('/orders/revoke/:id', service.generatePermissionMiddleware('orders-permission'), async (req, res) => {
    let result = await service.revokeOrder(req.params.id);
    log(req, result.status);
    res.status(result.status).send();
});


app.delete('/orders/bundles/revoke/:id', service.generatePermissionMiddleware('orders-permission'), async (req, res) => {
    let result = await service.revokeBundle(req.params.id);
    log(req, result.status);
    res.status(result.status).send();
});

app.get('/orders/requests', service.generatePermissionMiddleware('orders-permission'), async (req, res) => {
    let result = await service.getOrderRequests(req.headers.authorization);
    log(req, result.status);
    res.status(result.status).send(result.response);
})

app.get('/orders/bundles/requests', service.generatePermissionMiddleware('orders-permission'), async (req, res) => {
    let result = await service.getBundleRequests(req.headers.authorization);
    log(req, result.status);
    res.status(result.status).send(result.response);
})

app.get('/orders', service.generatePermissionMiddleware('orders-permission'), async (req, res) => {
    const result = await service.getOrders(req.headers.authorization);
    log(req, result.status);
    res.status(result.status).send(result.response);
});


app.get('/orders/bundles', service.generatePermissionMiddleware('orders-permission'), async (req, res) => {
    const result = await service.getBundles(req.headers.authorization);
    log(req, result.status);
    res.status(result.status).send(result.response);
});


app.get('/orders/bundles/:id', service.generatePermissionMiddleware('orders-permission'), async (req, res) => {
    const result = await service.getBundle(req.params.id);
    log(req, result.status);
    res.status(result.status).send(result.response);
});

app.post('/orders/cart/add/:id', service.generatePermissionMiddleware('orders-permission'), async(req, res) => {
    let result = await service.addToCart(req.params.id, req.headers.authorization);
    log(req, result.status);
    res.status(result.status).send();
});

app.post('/orders/cart/remove/:id', service.generatePermissionMiddleware('orders-permission'), async(req, res) => {
    let result = await service.removeFromCart(req.params.id, req.headers.authorization);
    log(req, result.status);
    res.status(result.status).send();
});

app.get('/orders/cart', service.generatePermissionMiddleware('orders-permission'), async(req, res) => {
    let result = await service.getCart(req.headers.authorization);
    log(req, result.status);
    res.status(result.status).send(result.response);
});

app.get('/orders/cart/size', service.generatePermissionMiddleware('orders-permission'), async(req, res) => {
    let result = await service.getCartSize(req.headers.authorization);
    log(req, result.status);
    res.status(result.status).send(result.response);
});

app.get('/orders/:id', service.generatePermissionMiddleware('orders-permission'), async (req, res) => {
    const result = await service.getOrder(req.params.id);
    log(req, result.status);
    res.status(result.status).send(result.response);
});