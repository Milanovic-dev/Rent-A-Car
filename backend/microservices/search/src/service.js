const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment');
//database
const dbConnect = require('../db');
const dbCollection = 'cars';
const ObjectID = require('mongodb').ObjectID;
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
    if(filter.mileage) searchObject.mileage = {$lte: parseInt(filter.mileage)};
    if(filter.cdwp) searchObject.cdwp = filter.cdwp == 'true';
    if(filter.seatCount) searchObject.seatCount = {$lte: parseInt(filter.seatCount)};
    console.log(searchObject)
    let result = await db.collection(dbCollection).find(searchObject).toArray();

    let ret = [];

    for(let car of result){
        if(car.pricelistId){
            const pricelist = await db.collection('pricelists').findOne({_id: ObjectID(car.pricelistId)})
            car.pricelist = pricelist;
        }

        if(filter.desiredMileage){
            const desiredMileage = parseInt(filter.desiredMileage);

            const currentMileage = parseInt(car.mileage);
            const limitMileage = parseInt(car.limitMileage);

            if(limitMileage - currentMileage < desiredMileage){
                continue;
            }
            else{
                ret.push(car);
            }
        }
        else
        {
            ret.push(car);
        }
    }

    return { response: ret, status: 200 };
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