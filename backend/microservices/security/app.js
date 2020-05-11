const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.raw({
    type: function (req) { return req.headers['content-type'] === 'application/ocsp-request' },
}))

app.get('/', (req, res) => {
    res.send('This is security service');
});

const options = {
    ca: [fs.readFileSync('https/intermediate.crt'), fs.readFileSync('https/root.crt')],
    cert: fs.readFileSync('https/endEntity.crt'),
    key: fs.readFileSync('https/endEntity.key')
};

//Certificate Server
const https = require("https");
const server = https.createServer(options, app);
require('./api/certificateApi') (app);
server.listen(4000, () => console.log('Security Service Running!'));

//OCSP Server
const appOCSP = express();
appOCSP.use(cors());
appOCSP.use(bodyParser.json({ limit: '20mb' }));
appOCSP.use('/uploads', express.static('uploads'))
appOCSP.use(bodyParser.raw({
    type: function (req) { return req.headers['content-type'] === 'application/ocsp-request' },
}))
const httpOCSP = require('http');
const serverOCSP = httpOCSP.createServer(appOCSP);
require('./ocsp/ocsp')(appOCSP);
serverOCSP.listen(8080, () => console.log(`OCSP Server running!`))




