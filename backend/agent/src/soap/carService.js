const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('../db');
const dbCollection = 'carAds';
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const createAd = async (ad) => {
    let result = await db.collection(dbCollection).insertOne(ad);
    if(result.insertedId)
    {
        return {response: result.insertedId,status: 200};
    }
}

module.exports = {createAd}
