const service = require('../service/orderService');

module.exports = function(app){
    app.get('/api/orders/all', async(req, res) => {
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });

    app.get('/api/orders/bundles/all', async (req, res) => {
        let result = await service.getAllBundles();
        res.status(result.status).send(result.response);
    });

    app.post('/api/orders/accept/:id', async(req, res) => {
        let result = await service.acceptOrder(req.params.id, 'orders');
        res.status(result.status).send();
    });

    app.post('/api/orders/decline/:id', async(req ,res) => {
        let result = await service.declineOrder(req.params.id, 'orders');
        res.status(result.status).send();
    });

    app.post('/api/orders/bundles/accept/:id', async(req, res) => {
        let result = await service.acceptBundle(req.params.id, 'bundles');
        res.status(result.status).send();
    });

    app.post('/api/orders/bundles/decline/:id', async(req ,res) => {
        let result = await service.declineBundle(req.params.id, 'bundles');
        res.status(result.status).send();
    });
}