const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Server
const server = http.createServer(app);

app.use(bodyParser.json({ limit: '20mb' }));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}));

require('./src/api/mailApi')(app);

app.get('/', async (req, res) => {
    res.send('This is mail server backend');
});


server.listen(process.env.PORT, () => {
    console.log("Mail Server running on port " + process.env.PORT);
});

