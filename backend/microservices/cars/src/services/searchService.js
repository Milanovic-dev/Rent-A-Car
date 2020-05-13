//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../../db');
const dbCollection = 'cars';
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const search = async (filter) => {

    let searchObject={};

    if(filter.takePoint) searchObject.takePoint = filter.takePoint;
    if(filter.returnPoint) searchObject.returnPoint = filter.returnPoint;
    if(filter.takeDate) searchObject.takeDate = filter.takeDate;
    if(filter.returnDate) searchObject.returnDate = filter.returnDate;

    if(filter.make) searchObject.make = filter.make;
    if(filter.model) searchObject.model = filter.model;
    if(filter.fuel) searchObject.fuel = filter.fuel;
    if(filter.transmission) searchObject.transmission = filter.transmission;
    if(filter.class) searchObject.class = filter.class;
    if(filter.lowestPrice) searchObject.price.$gt = filter.lowestPrice;
    if(filter.hightestPrice) searchObject.price.$lt = filter.highestPrice;
    if(filter.mileage) searchObject.mileage = filter.mileage;
    if(filter.intentedMileage) searchObject.intentedMileage.$lt = filter.intentedMileage;
    if(filter.cdw) searchObject.cdw = filter.cdw;
    if(filter.seatCount) searchObject.seatCount = filter.seatCount;

    console.log(searchObject);
    let result = await db.collection(dbCollection).find(searchObject).toArray();

    if(result.length <= 0)
    {
        console.log("No items to show.");
    }

    return { response: result, status: 200 };
}

module.exports = {search}
