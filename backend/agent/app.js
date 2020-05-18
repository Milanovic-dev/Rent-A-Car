const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
dotenv.config();

const soapService = require('./src/soap/soapService');

app.use(bodyParser.json());
//app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(fileUpload());

require('./src/api/carApi') (app);
require('./src/api/pricelistApi') (app);
require('./src/api/uploadApi') (app);

// Server
const server = http.createServer(app);

//Connection example dbSync
const db = require('./dbSync');
db.connect();


server.listen(8282, () => {
    console.log("Agent Server running on port 8282!");
    /*
    soapService.createService(server, () => {
        console.log("Soap Service Initialized");
    });
    */
});

//Register to Microservices Webhook
soapService.getClient(`${process.env.HOST_URL}/api/webhook/getWsdl`).then(soapClient => {
    db.connect().then(() => {
        soapClient.SubscribeAgent({username: process.env.APP_USERNAME, password: process.env.APP_PASSWORD}, (err, res) => {
            if(err){
                console.error(err);
                return;
            }
            
            if(res.accessToken){
                db.saveToken(res.accessToken);
                console.log(`${res.status}: Successfully subscribed to Webhook`);
            }
            else
            {
                console.error('Could not subscribe. Status:' + res.status);
            }
        });
    })
}).catch(err => { 
    console.error(err);
    console.error(`Cannot /getWsdl from ${process.env.HOST_URL}/api/webhook/`);
});



app.get('/', async (req, res) => {
    res.send('This is agent backend');
});

app.get('/getWsdl', async (req, res) => {
    const wsdl = fs.readFileSync('service.wsdl', 'utf8');
    res.type('application/xml');
    res.send(wsdl);
});

app.post('/testInsert', async (req, res) => {
    db.collection('cars').updateOne({make:'BMW'}, {$set: {model:'M4'}});
    res.send('Done');
});

app.get('/testGet', async (req, res) => {
    let result = await db.collection('cars').findOne({make:'BMW'});
    res.status(result.status).send(result.response);
});
