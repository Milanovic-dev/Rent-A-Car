const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment');
//database
const dbConnect = require('../db');
const dbCollection = 'cars';
const ObjectID = require('mongodb');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then(async (conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})



const search = async (filter) => {

    let searchObject={};
    
    if(filter.takePoint == "" & filter.takeDate == "" && filter.returnDate == "")
    {
        return { status: 400 };
    }

    if(filter.takePoint) searchObject.location = filter.takePoint;
    if(filter.returnPoint) searchObject.returnPoint = filter.returnPoint;
    
    if(filter.takeDate && filter.returnDate){
        searchObject.fromISO = {$lt: new Date(moment.unix(filter.takeDate).toISOString())};
        searchObject.toISO = {$gt: new Date(moment.unix(filter.returnDate).toISOString())};
    }

    if(filter.make) searchObject.make = filter.make;
    if(filter.model) searchObject.model = filter.model;
    if(filter.fuel) searchObject.fuel = filter.fuel;
    if(filter.transmission) searchObject.transmission = filter.transmission;
    if(filter.class) searchObject.class = filter.class;
    if(filter.lowestPrice) searchObject.price.$gt = filter.lowestPrice;
    if(filter.hightestPrice) searchObject.price.$lt = filter.highestPrice;
    if(filter.mileage) searchObject.mileage = {$lt: parseInt(filter.mileage)};
    if(filter.intentedMileage) searchObject.intentedMileage.$lt = filter.intentedMileage;
    if(filter.cdwp) searchObject.cdwp = filter.cdwp == 'true';
    if(filter.seatCount) searchObject.seatCount = filter.seatCount;
    console.log(searchObject)
    let result = await db.collection(dbCollection).find(searchObject).toArray();

    for(let car of result){
        car.pricelist = {}
    }

    return { response: result, status: 200 };
}


const getForm = async () => {
    let response = {};

    response.classes = await db.collection('classes').find({}).toArray();
    response.fuels = await db.collection('fuels').find({}).toArray();
    response.makes = await db.collection('makes').find({}).toArray();
    response.models = await db.collection('models').find({}).toArray();

    return {status: 200, response};
}

module.exports = {search, getForm}