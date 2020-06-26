const service = require('../services/reviewService');

module.exports = function(app) {

    app.get('/review/getAll', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });

    app.get('/review/get/:id', async (req, res) => {
        console.log(req.method + req.route.path);
        if(!req.params.id) return res.status('400');

        let result = await service.get(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.post('/review/create', service.generatePermissionMiddleware('comments-permission'), async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.body) return res.status('400');

        let result = await service.create(req.body, req.headers.authorization);
        res.status(result.status).send(result.response);
    });
    app.post('/review/allow/:id', service.generatePermissionMiddleware('admin-comment-permission'), async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.allow(req.params.id);
        res.status(result.status).send(result.response);
    });
    app.post('/review/disallow/:id', service.generatePermissionMiddleware('admin-comment-permission'),  async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.disallow(req.params.id);
        res.status(result.status).send(result.response);
    });


    app.get('/review/pending/:id', service.generatePermissionMiddleware('admin-comment-permission'), async (req, res) => {
      console.log(req.method + req.route.path);
      
      if(!req.params.id) return res.status('400');

      let result = await service.get(req.params.id);
      res.status(result.status).send(result.response);
    });

    app.delete('/review/remove/:id', service.generatePermissionMiddleware('admin-comment-permission'), async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.params.id) return res.status('400');

        let result = await service.remove(req.params.id);
        res.status(result.status).send(result.response);
    });

   
};
