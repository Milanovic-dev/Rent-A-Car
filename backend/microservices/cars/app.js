const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const service = require('./src/services/searchService');

app.use(cors());
app.use(bodyParser.json());


app.listen(4000, () => {
    console.log("==========================");
    console.log(`Cars microservice running!`);
    console.log("==========================");
});

app.get('/', (req, res) => {
    res.send('This is car service');
});

app.get('/api/v1/search', async (req,res) => {
    const result = await service.search(req.body);
    res.status(result.status).send(result.response);
});
