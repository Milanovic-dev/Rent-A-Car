const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const soap = require('soap');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.use(cors());

require('./src/api/carApi') (app);
require('./src/api/pricelistApi') (app);

// Server
const server = http.createServer(app);

// WSDL Service
const xml = fs.readFileSync('service.wsdl', 'utf8');
const { service, options } = require('./src/soap/soapService');

server.listen(8282, () => {
    console.log("============================")
    console.log("Server running on port 8282!");
    soap.listen(server, '/wsdl', service, xml, function(){
        console.log('Soap Server Initialized!');
        console.log("============================")
    });
});


app.get('/', (req, res) => {
    res.send('This is agent backend');
});

app.get('/getWsdl', (req, res) => {
    const wsdl = fs.readFileSync('service.wsdl', 'utf8');
    res.type('application/xml');
    res.send(wsdl);
});
