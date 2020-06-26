const service = require('../service/pricelistService');
const { log } = require('../security/logger');

module.exports = function(app) {

    app.get('/api/pricelist/v1/get/:id', async (req, res) => {
        let result = await service.get(req.params.id);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.post('/api/pricelist/v1/create', async (req, res) => {
        let result = await service.create(req.body);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.put('/api/pricelist/v1/update', async (req, res) => {
        let result = await service.update(req.body);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.delete('/api/pricelist/v1/remove/:id', async (req, res) => {
        let result = await service.remove(req.params.id);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.get('/api/pricelist/v1/all', async (req, res) => {
        let result = await service.getAll();
        log(req, result.status);
        res.status(result.status).send(result.response);
    });
}