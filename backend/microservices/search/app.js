const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


app.listen(4000, () => {
    console.log("==========================");
    console.log(`Search microservice running!`);
    console.log("==========================");
});

app.get('/', (req, res) => {
    res.send('This is search service');
});