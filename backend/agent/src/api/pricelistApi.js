const service = require('../service/pricelistService');
const { log } = require('../security/logger');

module.exports = function(app) {

    app.get('/api/pricelist/get/:id', async (req, res) => {
        let result = await service.get(req.params.id);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.post('/api/pricelist/create', async (req, res) => {
        let result = await service.create(req.body);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.put('/api/pricelist/update', async (req, res) => {
        let result = await service.update(req.body);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.delete('/api/pricelist/remove/:id', async (req, res) => {
        let result = await service.remove(req.params.id);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.get('/api/pricelist/all', async (req, res) => {
        let result = await service.getAll();
        log(req, result.status);
        res.status(result.status).send(result.response);
    });
}