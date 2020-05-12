const service = require('../service/carService');

module.exports = function(app){

    app.get('/api/cars/v1/get/:id', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.get(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.post('/api/cars/v1/create', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.create(req.body);
        res.status(result.status).send(result.response);
    });

    app.put('/api/cars/v1/update', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.update(req.body);
        res.status(result.status).send(result.response);
    });

    app.delete('/api/cars/v1/remove/:id', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.remove(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.get('/api/cars/v1/all', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });

};