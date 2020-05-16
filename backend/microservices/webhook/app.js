const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const fs = require('fs');

const { registerForGateway } = require('./src/config/index');

registerForGateway();

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const soapService = require('./src/soap/soapService');

server.listen(4000, () => {
    console.log("==========================");
    console.log(`Webhook microservice running!`);
    soapService.createService(server);
});

app.get('/', async (req,res) => {
    res.send("This is webhook service");
});

app.get('/getWsdl', (req, res) => {
    const wsdl = fs.readFileSync('service.wsdl', 'utf8');
    res.type('application/xml');
    res.send(wsdl);
});
