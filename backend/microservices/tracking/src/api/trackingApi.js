const service = require('../services/trackingService');

module.exports = function (app) {
    app.post('/api/tracking/:carId', async (req, res) => {
        console.log(req.method + req.route.path);

        if (!req.params.carId) return res.status('400');

        let result = await service.get(req.params.carId);
        res.status(result.status).send(result.response);
    });
    app.post('/api/tracking/:carId/track', async (req, res) => {
        console.log(req.method + req.route.path);

        if (!req.params.carId) return res.status('400');

        let result = await service.track(req.params.carId, req.body);
        res.status(result.status).send(result.response);
    });

}
