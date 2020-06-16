const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


app.listen(4000, () => {
    console.log("==========================");
    console.log(`Cars microservice running!`);
    console.log("==========================");
});
require('./src/api/carApi') (app);

require('./src/api/carApi') (app);
require('./src/api/makeApi') (app);
require('./src/api/modelApi') (app);
require('./src/api/fuelApi') (app);
require('./src/api/classApi') (app);

const dbConnect = require('./db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then(async (conn) => {
    db = conn;
    await db.dropDatabase();
    const service = require('./src/services/carService');
    await service.create({make:"Audi", model:"A4", power:"110", fuel:'Diesel', from:'14/03', to:'14/04', price:'800', ownerId:'AgentAdmin'});
    await service.create({make:"BMW", model:"M3", power:"90", fuel:'Petrol', from:'06/03', to:'08/04', price:'600', ownerId:'AgentAdmin'});
    await service.create({make:"Mercedes", model:"E220", power:"110", fuel:'Diesel', from:'14/03', to:'14/04', price:'1200', ownerId:'AgentUser'});
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

app.get('/', (req, res) => {
    res.send('This is car service');
});

app.get('/cars/test', async (req,res) => {
    res.send('Success');
});

