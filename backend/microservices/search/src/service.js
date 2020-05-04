//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../db');
const dbCollection = 'users';
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const search = async (filter) => {
    let result = await db.collection(dbCollection).find({
      make: filter.make,
      model: filter.model,
      fuel: filter.fuel,
      transmission: filter.transmission,
      class: filter.class,
      price: {$gt: filter.lowestPrice, $lt: filter.highestPrice },
      mileage: {$lt: filter.mileage},
      cdw: filter.cdw,
      seatCount: filter.seatCount
    }).toArray();

    return { response: result, status: 200 };
}

module.exports = {search}
