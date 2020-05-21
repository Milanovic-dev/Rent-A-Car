const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());


app.listen(4000, () => {
    console.log(`Search microservice running!`);
});

app.get('/', (req, res) => {
    res.send('This is search service');
});

