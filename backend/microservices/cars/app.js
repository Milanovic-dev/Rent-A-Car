const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { logger } = require('./src/security/logger');
app.use(cors());
app.use(bodyParser.json());
app.use(logger);
const service = require('./src/services/carService');

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
require('./src/api/reviewApi') (app);

const dbConnect = require('./db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then(async (conn) => {
    db = conn;
    await db.collection('cars').drop();
    await service.create({make:"Audi", model:"A4", power:"110", fuel:'Diesel', productionYear:'2014', from:'14/03', to:'14/04', price:'800', transmission:'Manual', rating: 4.7, seatCount: 4, mileage:'150k', ownerId:'Agent0'});
    await service.create({make:"BMW", model:"M3", power:"90", fuel:'Petrol', productionYear:'2011', from:'06/03', to:'08/04', price:'600', transmission:'Automatic', rating: 3.0, seatCount: 4, mileage:'100k', ownerId:'Agent0'});
    await service.create({make:"Mercedes", model:"E220", power:"110", fuel:'Diesel', productionYear:'2017', from:'14/03', to:'14/04', price:'1200', transmission:'Manual', rating: 4.4, seatCount: 4, mileage:'120k', ownerId:'user0'});
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

app.get('/', (req, res) => {
    res.send('This is car service');
});

app.get('/cars/test', async (req,res) => {
    res.send('Success');
});

