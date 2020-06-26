const service = require('../service/commentService');
const { log } = require('../security/logger');

module.exports = function(app){
	app.post('/api/comments/v1/add',async (req,res) =>{
        try{
            let result = await service.add(req.body.comment,req.body.id);
            log(req, res, 'INFO');
            res.status(result.status).send(result.response);
        }catch(err){
            log(req, res, 'ERROR', {errMessage: err});
            res.status(500).send();
        }
	});

	app.get('/api/comments/v1/getPending', async (req, res) => {
        let result = await service.getPending();
        res.status(result.status).send(result.response);
	});
	
	app.put('/api/comments/v1/approve', async (req, res) => {
        try{
            let result = await service.approve(req.body.id);
            log(req, res, 'info');
            res.status(result.status).send(result.response);
        }catch(err){
            log(req, res, 'error', {errMessage:err});
            res.status(500).send();
        }
	});
	
	app.put('/api/comments/v1/reject', async (req, res) => {
        try{
            let result = await service.reject(req.body.id);
            log(req, res, 'info');
            res.status(result.status).send(result.response);
        }catch(err){
            log(req, res, 'error', {errMessage: err});
            res.status(500).send();
        }
	});
	
	app.get('/api/comments/v1/getAll', async (req, res) => {
        let result = await service.getAll();
        res.status(result.status).send(result.response);
	});

	app.post('/api/comments/v1/reply',async (req,res) =>{
        let result = await service.reply(req.body.id,req.body.comment);
        res.status(result.status).send(result.response);
	});

};
