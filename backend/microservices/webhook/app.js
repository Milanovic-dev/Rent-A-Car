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
    console.log("==========================");
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
    await db.dropDatabase();
    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:"Audi", model:"A8"});
    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:"Audi", model:"A8"});
    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:"Audi", model:"A8"});
    const coll = await db.collection('agents').findOne({username:"AgentAdmin"});
    const bcrypt = require('bcrypt');
    if(!coll){
        const pass = bcrypt.hashSync('agent', 10);
        db.collection('agents').insertOne({username:"AgentAdmin", password: pass});
    }

}).catch((e) => {
    console.log(`DB error: ${e}`);
})

app.get('/webhook/testBase', async (req, res) => {
    let result = await db.collection('cars').find().toArray();
    res.json(result);
});

app.post('/webhook/insert', async(req, res) => {
    let result = await db.collection('cars').insertOne(req.body);
    console.log(result.insertedId);
    res.send('done');
});

app.post('/webhook/update/:id', async(req, res) => {
    let result = await db.collection('cars').updateOne({_id: require('mongodb').ObjectID(req.params.id)}, {$inc: {version:1}});
    res.send('done');
});