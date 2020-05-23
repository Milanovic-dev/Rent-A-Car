const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
dotenv.config();

const soapService = require('./src/soap/soapService');

app.use(bodyParser.json());
//app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.use(cors());
app.use('/uploads', express.static('uploads'))
app.use(fileUpload());

 // Prevent opening page in frame or iframe to protect from clickjacking
 app.disable("x-powered-by");
 app.use(helmet());

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
});

//Register to Microservices Webhook
soapService.getClient().then(soapClient => {
    db.connect().then(() => {
        soapClient.SubscribeAgent({username: process.env.APP_USERNAME, password: process.env.APP_PASSWORD}, (err, res) => {
            if(err){
                console.error(err);
                return;
            }
            //db.getDb().dropDatabase();
            if(res.accessToken){
                db.saveToken(res.accessToken);
                console.log(`${res.status}: Successfully subscribed to Webhook`);
                db.collection('cars', true).find();
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


app.post('/test', async (req, res) => {
    let result = await db.collection('cars').find();
    res.json(result);
});

app.get('/testOne', async (req, res) => {
    console.time();
    let result = await db.collection('cars').findOne({_id: require('mongodb').ObjectID('5ec500acbf441d0020c5108b')});
    console.timeEnd();
    res.json(result);
});