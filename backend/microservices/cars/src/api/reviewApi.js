const service = require('../service/reviewService');

module.exports = function(app) {

    app.get('/review/get/:id', async (req, res) => {
        console.log(req.method + req.route.path);
        
        if(!req.params.id) return res.status('400');

        let result = await service.get(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.post('/review/create', async (req, res) => {
        console.log(req.method + req.route.path);
        // let uid = res.locals.uid;
        console.log("ID KORISNIKA: " + res.locals);
        if(!req.body) return res.status('400');

        let result = await service.create(req.body);
        res.status(result.status).send(result.response);
    });


    app.get('/review/pending/:id', async (req, res) => {
      console.log(req.method + req.route.path);
      
      if(!req.params.id) return res.status('400');

      let result = await service.get(req.params.id);
      res.status(result.status).send(result.response);
    });

    app.delete('/review/remove/:id', async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.params.id) return res.status('400');

        let result = await service.remove(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.get('/reviews', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });
};
