const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const soapService = require('./src/soap/soapService');

app.use(bodyParser.json());
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.use(cors());

require('./src/api/carApi') (app);
require('./src/api/pricelistApi') (app);

// Server
const server = http.createServer(app);

//Connection example dbSync
//const db = require('./dbSync');
//db.connect();


server.listen(8282, () => {
    console.log("============================")
    console.log("Agent Server running on port 8282!");
    soapService.createService(server, () => {
        console.log("Soap Service Initialized");
        console.log("============================");
    });
});


app.get('/', async (req, res) => {
    res.send('This is agent backend');
});

app.get('/getWsdl', async (req, res) => {
    const wsdl = fs.readFileSync('service.wsdl', 'utf8');
    res.type('application/xml');
    res.send(wsdl);
});


