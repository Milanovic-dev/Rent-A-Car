const service = require('../service/searchService');

module.exports = function(app) {
  app.get('/search', async (req, res) => {
    console.log(req.method + req.route.path);

    if(!req.params.filter) return res.status('400');

    let result = await service.get(req.params.filter);
    res.status(result.status).send(result.response);
});
}
