const service = require('../service/commentService');

module.exports = function(app){
	app.post('/api/comments/v1/add',async (req,res) =>{
		console.log(req.method + req.route.path);
        let result = await service.add(req.body.comment,req.body.id);
        res.status(result.status).send(result.response);
	});

	app.get('/api/comments/v1/getPending', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getPending();
        res.status(result.status).send(result.response);
	});
	
	app.put('/api/comments/v1/approve', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.approve(req.body.id);
        res.status(result.status).send(result.response);
	});
	
	app.put('/api/comments/v1/reject', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.reject(req.body.id);
        res.status(result.status).send(result.response);
	});
	
	app.get('/api/comments/v1/getAll', async (req, res) => {
        console.log(req.method + req.route.path);
        let result = await service.getAll();
        res.status(result.status).send(result.response);
	});

	app.post('/api/comments/v1/replay',async (req,res) =>{
		console.log(req.method + req.route.path);
        let result = await service.replay(req.body.id,req.body.comment);
        res.status(result.status).send(result.response);
	});

};
