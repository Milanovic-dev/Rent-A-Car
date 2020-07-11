const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const device = require('express-device');
const { generatePermissionMiddleware } = require('./src/services/carService');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.json());
app.use('/cars/uploads', express.static('uploads'))
app.use(fileUpload());
app.use(device.capture());
app.use((req, res, next) => {
    const auth = req.headers.authorization;

    if(auth){
        const token = auth.split(' ')[1];

        if(!token) req.headers.authorization = undefined;
        if(token == null) req.headers.authorization = undefined;
        if(token == 'null') req.headers.authorization = undefined;
    }

    next();
});

const service = require('./src/services/carService');
const pricelistService = require('./src/services/pricelistService');

app.listen(4000, () => {
    console.log(`Cars microservice running!`);
});

require('./src/api/carApi') (app);
require('./src/api/carApi') (app);
require('./src/api/makeApi') (app);
require('./src/api/modelApi') (app);
require('./src/api/fuelApi') (app);
require('./src/api/classApi') (app);
require('./src/api/reviewApi') (app);
require('./src/api/pricelistApi') (app);

const dbConnect = require('./db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then(async (conn) => {
    db = conn;

    const p1 = await pricelistService.create({pricePerDay: 50, pricePerKM: 30, priceCDWP: 150, sale: 10, ownerId:'Agent0'});
    const p2 = await pricelistService.create({pricePerDay: 30, pricePerKM: 15, priceCDWP: 100, sale:0, ownerId:'Agent0'});
    const p3 = await pricelistService.create({pricePerDay: 200, pricePerKM: 80, priceCDWP: 150, sale: 5, ownerId:'Agent0'});

    await service.create({make:"Audi", model:"A4", power:"110", fuel:'Diesel', pricelistId: p1.response, productionYear:'2014', from:1592864623, to:1593864623, price:45, transmission:'manual', rating: 4.7, seatCount: 4, mileage:150000, ownerId:'Agent0', images:['https://localhost:8080/cars/uploads/audi-a4.jpg'], color:'Dark Silver', location: 'Novi Sad', limitMileage: 200000, class:'Small Car', cdwp: 'yes', description: 'Very reliable and very cheap.Do not miss this chance!'});
    await service.create({make:"BMW", model:"M3", power:"90", fuel:'Petrol', pricelistId: p2.response, productionYear:'2014', from:1561982221, to:1564660621, price:30, transmission:'automatic', rating: 3.0, seatCount: 4, mileage:100000, ownerId:'Agent0', images:['https://localhost:8080/cars/uploads/M3.jpg'], color:'Blue', location: 'Novi Sad', limitMileage: 200000, class:'Saloon', cdwp: 'yes'});
    await service.create({make:"Mercedes", model:"E220", power:"110", fuel:'Diesel', pricelistId: p3.response, productionYear:'2015', from:1593604621, to:1601553421, price:190, transmission:'manual', rating: 4.4, seatCount: 4, mileage:120000, ownerId:'user0', images:['https://localhost:8080/cars/uploads/merc.jpg'], color:'White', location: 'Novi Sad', limitMileage: 200000, class:'Saloon', cdwp: 'no'});

    await db.collection('makes').insertOne({name:"Audi"});
    await db.collection('makes').insertOne({name:"BMW"});
    await db.collection('makes').insertOne({name:"Mercedes"});
    await db.collection('models').insertOne({name:"A4"});
    await db.collection('models').insertOne({name:"M3"});
    await db.collection('models').insertOne({name:"E220"});
    await db.collection('classes').insertOne({name:"Small Car"});
    await db.collection('classes').insertOne({name:"Saloon"});
    await db.collection('fuels').insertOne({name:"Diesel"});
    await db.collection('fuels').insertOne({name:"Petrol"});

}).catch((e) => {
    console.log(`DB error: ${e}`);
})

app.get('/', (req, res) => {
    res.send('This is car service');
});

app.get('/cars/test', async (req,res) => {
    res.send('Success');
});

app.get('/cars/logs', service.generatePermissionMiddleware('*'),  async(req, res) => {
    const log = 'logs.log';
    res.download(log);
});