const service = require('../service/carService');

module.exports = function(app){

    app.get('/get/:id', async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.params.id) return res.status('400');

        let result = await service.get(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.post('/create', async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.body) return res.status('400');

        let result = await service.create(req.body);
        res.status(result.status).send(result.response);
    });

    app.put('/update', async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.body) return res.status('400');

        let result = await service.update(req.body);
        res.status(result.status).send(result.response);
    });

    app.delete('/remove/:id', async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.params.id) return res.status('400');

        let result = await service.remove(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.get('/all', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });

    app.get('/stats', async (req, res) => {

    });

    app.get('/stats/:id', async (req, res) => {

    });
};
