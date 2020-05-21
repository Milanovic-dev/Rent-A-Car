const service = require('../service/reviewService');

module.exports = function(app) {

    app.get('/api/cars/review/get/:id', async (req, res) => {
        console.log(req.method + req.route.path);
        
        if(!req.params.id) return res.status('400');

        let result = await service.get(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.post('/api/cars/review/create', async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.body) return res.status('400');

        let result = await service.create(req.body);
        res.status(result.status).send(result.response);
    });

    app.get('/api/cars/review/pending', async (req, res) => {
      console.log(req.method + req.route.path);
      
      if(!req.params.id) return res.status('400');

      let result = await service.get(req.params.id);
      res.status(result.status).send(result.response);
    });

    app.delete('/api/cars/review/remove/:id', async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.params.id) return res.status('400');

        let result = await service.remove(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.get('/api/cars/reviews', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });
};