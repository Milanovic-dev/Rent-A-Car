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

const acceptOrder = async (id) => {

    if(!id) return { status:400 }

    let res = await db.collection('orders').updateOne({_id: ObjectID(id)}, {$set:{status: 'PAID'}});

    if(res.modifiedCount == 1){
        db.sync();
        return {status: 200};
    }

    return { status: 404 };
}

const declineOrder = async (id) => {
    if(!id) return { status:400 }

    let res = await db.collection('orders').updateOne({_id: ObjectID(id)}, {$set:{status: 'CANCELED'}});

    if(res.modifiedCount == 1){
        db.sync();
        return {status: 200};
    }

    return { status: 404 };
}

const getAll = async () => {
    let res = await db.collection('orders').find({}).toArray();

    for(let order of res){
        const car = await db.collection('cars').findOne({_id: ObjectID(order.carId)});
        order.car = car;
    }

    return {status: 200, response: res};
}


module.exports = {
    getAll,
    acceptOrder,
    declineOrder
}