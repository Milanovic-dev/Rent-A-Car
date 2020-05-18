
const service = require('../service/uploadService');

module.exports = function (app) {
    
    
    app.post('/api/upload/v1', async (req, res) => {
        console.log(req.files);
        console.log(req.method + req.route.path);
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files were uploaded.');
            return;
        }

        service.upload(req.files.file, (result) => {
            res.status(result.status).send(result.response);
        });
    });


};

