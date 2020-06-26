const service = require('../service/messagesService');
const { log } = require('../security/logger');

module.exports = function(app){

    
    app.post('/message/send', async (req, res) => {
      let result = await service.sendMessage(req.headers.authorization, req.body);
      log(req, result.status);
      res.status(result.status).send(result.response);
  });

    app.delete('/message/remove/:id', async (req, res) => {
        let result = await service.removeMessage(req.headers.authorization, req.params.id);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    app.post('/message/all', async (req, res) => {
        let result = await service.getAll(req.headers.authorization, req.body.receiverId);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });
    
};