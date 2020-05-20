const service = require('../service/messageService');

module.exports = function(app){

    app.get('/messages/:id', async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.params.id) return res.status('400');

        let result = await service.get(req.params.id);
        res.status(result.status).send(result.response);
    });
    
    app.post('/messages/sent', async (req, res) => {
      console.log(req.method + req.route.path);

      if(!req.body) return res.status('400');

      let result = await service.create(req.body);
      res.status(result.status).send(result.response);
  });

    app.delete('/messages/remove/:id', async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.params.id) return res.status('400');

        let result = await service.remove(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.get('/messages', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getAll();
        res.status(result.status).send(result.response);
    });

};