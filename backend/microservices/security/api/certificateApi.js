const certificateService = require('../admin/certificateService');

module.exports = (app) => {

    //POST
    app.post('/certificate/createRoot', async (req, res) => {
        let result = await certificateService.createCertificateAsync(req.body, null);
        res.status(result.status).send(result.response);
    });

    app.post('/certificate/create/:parentId', async (req, res) => {
        let result = await certificateService.createCertificateAsync(req.body, req.params.parentId);
        res.status(result.status).send(result.response);
    });

     //PUT
    app.put('/certificate/revoke/:id', async (req, res) => {
        let result = await certificateService.revokeAsync(req.params.id);
        res.status(result.status).send();
    });

    //GET
    app.get('/certificate/getOne/:id', async (req, res) => {
        let result = await certificateService.fetchCertificateAsync(req.params.id);
        res.status(result.status).send(result.response);
    });

    app.get('/certificate/getAll', async (req, res) => {
        let result = await certificateService.fetchCertificateTreesAsync();
        res.status(result.status).send(result.response);
    });

    app.get('/certificate/getAll/:rootId', async (req, res) => {
        let result = await certificateService.fetchCertificateTreeAsync(req.params.rootId);
        res.status(result.status).send(result.response);
    });

    app.get('/certificate/getUpToRoot/:serialNumber', async (req, res) => {
        let result = await certificateService.fetchUpToRootAsync(req.params.serialNumber);
        res.status(result.status).send(result.response);
    });

    //DELETE
    app.delete('/certificate/drop', async (req, res) => {
        await certificateService.removeAll();
        res.status(200).send();
    });

}


