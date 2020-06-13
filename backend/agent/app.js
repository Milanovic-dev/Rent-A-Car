const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const colors = require('colors');
dotenv.config();

const soapService = require('./src/soap/soapService');

const securityMiddleware = require('./src/security/securityMiddleware');

require('./src/api/carApi') (app);
require('./src/api/pricelistApi') (app);
require('./src/api/uploadApi') (app);

// Server
const server = http.createServer(app);

//Connection example dbSync
const db = require('./dbSync');
const { ObjectID } = require('mongodb');
db.connect();


app.use(bodyParser.json({ limit: '20mb' }));
app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(fileUpload());

//securityMiddleware.config(app, server);

server.listen(8282, () => {
    console.log("Agent Server running on port 8282!");
});

//Register to Microservices Webhook
soapService.getClient().then(soapClient => {
    db.connect().then(() => {
        soapClient.SubscribeAgent({username: process.env.APP_USERNAME, password: process.env.APP_PASSWORD}, async (err, res) => {
            if(err){
                console.error(err);
                return;
            }
            //db.getDb().dropDatabase();
            if(res.accessToken){
                await db.saveToken(res.accessToken);
                console.log('Sync: ' + 'ON'.green);
                db.syncAll();
            }
            else
            {
                console.error('Could not subscribe. Status:' + res.status);
                console.log('Sync: ' + 'OFF'.red); 
            }
        });
    })
}).catch(err => { 
    console.error(err);
    console.log('Sync: ' + 'OFF'.red); 
});



app.get('/', async (req, res) => {
    res.send('This is agent backend');
});

app.get('/getWsdl', async (req, res) => {
    const wsdl = fs.readFileSync('service.wsdl', 'utf8');
    res.type('application/xml');
    res.send(wsdl);
});


app.post('/login', async (req, res) => {
    
});


app.post('/testSecurity/:id', async (req, res) => {
    const resu = await db.collection('cars').removeOne({_id: ObjectID(req.params.id)});
    res.status(200).json(req.body).send();
});
