const service = require('../service/carService');
const { csrfProtection } = require('../security/securityMiddleware');
module.exports = function(app){

    app.get('/api/cars/get/:id', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.get(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.post('/api/cars/create', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.create(req.body);
        res.status(result.status).send(result.response);
    });

    app.put('/api/cars/update', csrfProtection, async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.update(req.body);
        res.status(result.status).send(result.response);
    });

    app.delete('/api/cars/remove/:id', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.remove(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.get('/api/cars/all', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });

    app.post('/api/cars/rented', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.rented(req.body);
        res.status(result.status).send(result.response);
    });
    app.get('/api/cars/stats', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.stats();
        res.status(result.status).send(result.response);
    });
};

