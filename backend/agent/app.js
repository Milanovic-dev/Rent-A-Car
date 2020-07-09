const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const fileUpload = require('express-fileupload');
const colors = require('colors');

const fs = require('fs');
const device = require('express-device');

const soapService = require('./src/soap/soapService');

// Server
//const server = http.createServer(app);
const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.crt')
}
const server = https.createServer(httpsOptions, app);


app.use(bodyParser.json({ limit: '20mb' }));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}));
app.use('/uploads', express.static('uploads'))
app.use(fileUpload());

require('./src/api/carApi')(app);
require('./src/api/pricelistApi')(app);
require('./src/api/uploadApi')(app);
require('./src/api/orderApi')(app);
require('./src/api/messagesApi')(app);


server.listen(8282, () => {
    console.log("Agent Server running on port 8282!");
});

global.ms_conn = false;

require('./db')().then(db => {
    //Register to Microservices Webhook
    soapService.getClient().then(soapClient => {
        soapClient.SubscribeAgent({ username: process.env.APP_USERNAME, password: process.env.APP_PASSWORD }, async (err, res) => {
            if (err) {
                console.error(err);
                return;
            }

            if (res.accessToken) {
                await db.saveToken(res.accessToken);
                console.log('Sync: '.yellow + 'ON'.green);
                global.ms_conn = true;
                await db.sync();
            }
            else {
                console.error('Could not subscribe. Status:' + res.status);
                console.log('Sync: ' + 'OFF'.red);
            }
        });
    }).catch(err => {
        console.error(err);
        console.log('Sync: ' + 'OFF'.red);
    });
})

var date = new Date();
date.setTime(1561982221000);
console.log(date.toISOString());

app.get('/', async (req, res) => {
    res.send('This is agent backend');
});


