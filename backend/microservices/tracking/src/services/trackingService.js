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
var Queue = require('better-queue');

var trackingQueue = new Queue(async (batch, cb)  => {
    console.log('tracking worker')
    console.log(batch.length)
    for(let i=0;i<batch.length;i++){
        console.log(batch[i])
        await db.collection(dbCollection).insertOne(batch[i]);
    }

    cb();
  }, { batchSize: 200, batchDelay: 10000 });





const get = async (carId) => {

    let result = await db.collection(dbCollection).find({carId: carId}).toArray();

    if(result.length <= 0)
    {
        console.log("No items to show.");
    }

    return { response: result, status: 200 };
}

const track = async (carId, data) => {

    /*await db.collection(dbCollection).insertOne({
        carId: carId,
        renterId: data.renterId,
        ownerId: data.ownerId,
        coordinates: data.coordinates,
        timestamp: Math.floor(new Date().getTime() / 1000)
    })*/

    for(let i=0;i<data.coordinatesArray.length;i++){
        trackingQueue.push({
            carId: carId,
            renterId: data.renterId,
            ownerId: data.ownerId,
            coordinates: data.coordinatesArray[i][0],
            timestamp: data.coordinatesArray[i][1]
        });
    
    }




    return { response: {
        error: null,
        successful: true
    }, status: 200 };
}






module.exports = {get, track}
