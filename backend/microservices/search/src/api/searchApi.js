const service = require('../services/searchService');

module.exports = function(app) {
  app.post('/search/cars', async (req, res) => {
    let result = await service.search(req.body);
    res.status(result.status).send(result.response);
});
}
