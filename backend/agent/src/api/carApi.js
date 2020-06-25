const service = require('../service/carService');
const { csrfProtection } = require('../security/securityMiddleware');
const { log } = require('../security/logger');
module.exports = function(app){

    app.get('/api/cars/get/:id', async (req, res) => {
        let result = await service.get(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.post('/api/cars/create', async (req, res) => {
        let result = await service.create(req.body);
        log(req, res);
        res.status(result.status).send(result.response);
    });

    app.put('/api/cars/update', async (req, res) => {
        let result = await service.update(req.body);
        log(req, res);
        res.status(result.status).send(result.response);
    });

    app.delete('/api/cars/remove/:id', async (req, res) => {
        let result = await service.remove(req.params.id);
        log(req, res);
        res.status(result.status).send(result.response);
    });

    app.get('/api/cars/all', async (req, res) => {
        let result = await service.getAll();
        log(req, res);
        res.status(result.status).send(result.response);
    });

    app.post('/api/cars/mileageReport/:id/:carId', async (req, res) => {
        let result = await service.mileageReport(req.body, req.params.id, req.params.carId);
        res.status(result.status).send(result.response);
    });
    app.post('/api/cars/stats/:sort', async (req, res) => {       
        let result = await service.stats(req.params.sort);
        res.status(result.status).send(result.response);
    });
    app.get('/api/cars/completedRentals', async (req, res) => {
      
        let result = await service.completedRentals();
        res.status(result.status).send(result.response);
    });
    app.get('/api/cars/completedRentals/bundles', async (req, res) => {
       
        let result = await service.completedRentalsBundles();
        res.status(result.status).send(result.response);
    });
    
    app.get('/api/cars/completedRentals/:id', async (req, res) => {
        
        let result = await service.completedRental(req.params.id);
        res.status(result.status).send(result.response);
    });
    app.get('/api/cars/mileageReport/get/:id/:carId', async (req, res) => {
        
        let result = await service.report(req.params.id, req.params.carId);
        res.status(result.status).send(result.response);
    });
    app.put('/api/cars/busy', async (req, res) => {
        console.log(req.body);
        let result = await service.busy(req.body);
        log(req, res);
        res.status(result.status).send(result.response);
    });
    
};

