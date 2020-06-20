const ObjectID = require('mongodb').ObjectID;
const dbCollection = 'cars';
const dbConnect = require('../../db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
    .then((conn) => {
        db = conn;
    }).catch((e) => {
        console.log(`DB error: ${e}`);
    })

const getAll = async () => {
    let res = await db.collection('orders').find({}).toArray();
    return {status: 200, response: res};
}

module.exports = {
    getAll
}