//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../../db');
const dbCollection = 'tracking';
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const get = async (carId) => {

    let result = await db.collection(dbCollection).find({carId: carId}).toArray();

    if(result.length <= 0)
    {
        console.log("No items to show.");
    }

    return { response: result, status: 200 };
}

const track = async (carId, data) => {

    await db.collection(dbCollection).insertOne({
        carId: carId,
        renterId: data.renterId,
        ownerId: data.ownerId,
        coordinates: data.coordinates,
        timestamp: Math.floor(new Date().getTime() / 1000)
    })

    return { response: {
        error: null,
        successful: true
    }, status: 200 };
}



module.exports = {get}
