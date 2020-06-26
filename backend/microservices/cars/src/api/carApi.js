const service = require('../services/carService');

module.exports = function(app){

    app.post('/cars/upload', function (req, res) {    
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }
    
        service.upload(req.files.file, res)
    });

    //service.generatePermissionMiddleware('')

    app.get('/cars/get/:id', async (req, res) => {

        if(!req.params.id) return res.status('400');

        let result = await service.get(req.params.id, req.headers.authorization);
        res.status(result.status).send(result.response);
    });

    app.post('/cars/create', service.generatePermissionMiddleware('car-action-permission'), async (req, res) => {

        if(!req.body) return res.status('400');

        let result = await service.create(req.body, req.headers.authorization);
        res.status(result.status).send(result.response);
    });

    app.put('/cars/update', service.generatePermissionMiddleware('car-action-permission'), async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.body) return res.status('400');

        let result = await service.update(req.body);
        res.status(result.status).send(result.response);
    });
    app.put('/cars/busy', service.generatePermissionMiddleware('car-action-permission'), async (req, res) => {
        console.log(req.body);
        if(!req.body) return res.status('400');

        let result = await service.busy(req.body);
        res.status(result.status).send(result.response);
    });

    app.delete('/cars/remove/:id',service.generatePermissionMiddleware('car-action-permission'), async (req, res) => {

        if(!req.params.id) return res.status('400');

        let result = await service.remove(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.get('/cars', async (req, res) => {
        let result = await service.getAll(req.headers.authorization);
        res.status(result.status).send(result.response);
    });

    app.get('/cars/stats', service.generatePermissionMiddleware('cars-stats-permission'), async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.stats();
        res.status(result.status).send(result.response);
    });

    app.get('/cars/stats/:id', async (req, res) => {

    });
    

};
