const service = require('../service/bundleService');

module.exports = function(app) {

    app.get('/api/orders/bundles/:id', async (req, res) => {
        console.log(req.method + req.route.path);
        
        if(!req.params.id) return res.status('400');

        let result = await service.get(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.get('api/orders/bundles', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });
};
