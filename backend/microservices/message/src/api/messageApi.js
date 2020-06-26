const service = require('../service/messageService');

module.exports = function(app){

    
    app.post('/message/send', service.generatePermissionMiddleware('messages-permission'), async (req, res) => {
      console.log(req.method + req.route.path);

      if(!req.body) return res.status('400');

      let result = await service.sendMessage(req.headers.authorization, req.body);
      res.status(result.status).send(result.response);
  });

    app.delete('/message/remove/:id', service.generatePermissionMiddleware('messages-permission'), async (req, res) => {
        console.log(req.method + req.route.path);

        if(!req.params.id) return res.status('400');

        let result = await service.removeMessage(req.headers.authorization, req.params.id);
        res.status(result.status).send(result.response);
    });

    app.post('/message/all', service.generatePermissionMiddleware('messages-permission'), async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getAll(req.headers.authorization, req.body.receiverId);
        res.status(result.status).send(result.response);
    });
    
};