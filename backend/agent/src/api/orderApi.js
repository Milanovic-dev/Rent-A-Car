const service = require('../service/orderService');
const { log } = require('../security/logger');

module.exports = function(app){
    app.get('/api/orders/all', async(req, res) => {
        let result = await service.getAll();
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.get('/api/orders/bundles/all', async (req, res) => {
        let result = await service.getAllBundles();
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.post('/api/orders/accept/:id', async(req, res) => {
        let result = await service.acceptOrder(req.params.id, 'orders');
        log(req, res, 'info');
        res.status(result.status).send();
    });
    app.post('/api/orders/finish/:id', async(req, res) => {
        let result = await service.finishOrder(req.params.id, 'orders');
        log(req, res, 'info');
        res.status(result.status).send();
    });

    app.post('/api/orders/decline/:id', async(req ,res) => {
        let result = await service.declineOrder(req.params.id, 'orders');
        log(req, result.status);
        res.status(result.status).send();
    });

    app.post('/api/orders/bundles/accept/:id', async(req, res) => {
        let result = await service.acceptBundle(req.params.id, 'bundles');
        log(req, result.status);
        res.status(result.status).send();
    });
    app.post('/api/orders/bundles/finish/:id', async(req, res) => {
        let result = await service.finishBundle(req.params.id, 'bundles');
        log(req, result.status);
        res.status(result.status).send();
    });

    app.post('/api/orders/bundles/decline/:id', async(req ,res) => {
        let result = await service.declineBundle(req.params.id, 'bundles');
        log(req, result.status);
        res.status(result.status).send();
    });
}