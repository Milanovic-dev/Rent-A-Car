const service = require('../service/trackingService');
const { log, logCustom } = require('../security/logger');
module.exports = function(app){

    app.get('/api/tracking/get/:id', async (req, res) => {
        let result = await service.get(req.params.id);
        log(req, result.status);
        res.status(result.status).send(result.response);
    });

    
};

