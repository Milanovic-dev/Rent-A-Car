const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

const soapService = require('./src/soap/soapService');

server.listen(4000, () => {
    console.log(`Webhook microservice running!`);
    soapService.createService(server);
});

app.get('/webhook', async (req,res) => {
    res.send("This is webhook service");
});

app.get('/webhook/getWsdl', (req, res) => {
    const wsdl = fs.readFileSync('service.wsdl', 'utf8');
    res.type('application/xml');
    res.send(wsdl);
});

//Mock insert agent
const dbConnect = require('./db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then(async (conn) => {
    db = conn;
    //await db.dropDatabase();
    const coll = await db.collection('agents').findOne({username:"Agent0"});
    const bcrypt = require('bcrypt');
    if(!coll){
        const pass = bcrypt.hashSync('agent', 10);
        db.collection('agents').insertOne({username:"Agent0", password: pass});
    }

}).catch((e) => {
    console.log(`DB error: ${e}`);
})

app.get('/webhook/testChanges', async(req, res) => {
    let result = await db.collection('changes').find().toArray();
    res.json(result);
});


app.get('/webhook/getOrders', async(req,res) => {
    let result = await db.collection('orders').find({}).toArray();
    res.status(200).send(result);
})

app.delete('/webhook/drop', async(req, res) => {
    db.dropDatabase();
    res.send('ok');
})