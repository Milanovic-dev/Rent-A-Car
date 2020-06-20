const service = require('../service/orderService');

module.exports = function(app){
    app.get('/api/orders/all', async(req, res) => {
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });

    app.post('/api/orders/accept/:id', async(req, res) => {
        let result = await service.acceptOrder(req.params.id);
        res.status(result.status).send();
    });

    app.post('/api/orders/decline/:id', async(req ,res) => {
        let result = await service.declineOrder(req.params.id);
        res.status(result.status).send();
    });
}