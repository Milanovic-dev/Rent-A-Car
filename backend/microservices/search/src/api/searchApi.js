const service = require('../services/searchService');

module.exports = function(app) {
  app.get('/search/cars', async (req, res) => {
    let result = await service.search(req.body);
    res.status(result.status).send(result.response);
});
}
