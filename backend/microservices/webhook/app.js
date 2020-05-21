const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const fs = require('fs');

const { registerForGateway } = require('./src/config/index');

registerForGateway('webhook');

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

//Mock insert agent
const dbConnect = require('./db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then(async (conn) => {
    db = conn;
    
    await db.dropDatabase();
    const coll = await db.collection('agents').findOne({username:"AgentAdmin"});
    const bcrypt = require('bcrypt');
    if(!coll){
        const pass = bcrypt.hashSync('agent', 10);
        db.collection('agents').insertOne({username:"AgentAdmin", password: pass});
    }

    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:"Audi", model:"A8", version:2});
    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:'Merc', model:'E220', version:1});
    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:'Merc', model:'A', version:1});
    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:'Merc', model:'C', version:1});
    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:'Merc', model:'S', version:1});
    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:'Merc', model:'G', version:1});
    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:'Merc', model:'CLS', version:1});
    await db.collection('cars').insertOne({ownerId:'AgentAdmin', make:'Merc', model:'GLE', version:1});
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

app.get('/testBase', async (req, res) => {
    let result = await db.collection('cars').find().toArray();
    res.json(result);
});

app.post('/insert', async(req, res) => {
    let result = await db.collection('cars').insertOne(req.body);
    console.log(result.insertedId);
    res.send('done');
});

app.post('/update/:id', async(req, res) => {
    let result = await db.collection('cars').updateOne({_id: require('mongodb').ObjectID(req.params.id)}, {$inc: {version:1}});
    res.send('done');
});