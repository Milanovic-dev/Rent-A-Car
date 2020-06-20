const service = require('../service/orderService');

module.exports = function(app){
    app.get('/api/orders/all', async(req, res) => {
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });
}