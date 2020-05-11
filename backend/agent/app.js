const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const soapService = require('./src/soap/soapService');

app.use(bodyParser.json());
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.use(cors());

require('./src/api/carApi') (app);
require('./src/api/pricelistApi') (app);

// Server
const server = http.createServer(app);

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

app.get('/test', async (req, res) => {
    soapService.getClient('http://localhost:4000/getWsdl').then(client => {
        client.SubscribeAgent({username:"Username", secret:"Pass", cars:[{make:"Audi"},{make:"BMW"}]}, function(err, result) {
            if(err){
                console.log(err);
            }      
    
            console.log(result);
        });

        client.SyncAgent({username:"Username", secret:"Pass"}, function(err, result) {
            if(err){
                console.log(err);
            }
    
            console.log(result)
        });
    }).catch((res) => {
        console.error("REJECT REASON:" + res);
    });

    res.status(200).send("Test");
});

app.get('/getWsdl', async (req, res) => {
    const wsdl = fs.readFileSync('service.wsdl', 'utf8');
    res.type('application/xml');
    res.send(wsdl);
});
