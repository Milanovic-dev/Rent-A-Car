//env
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//database
const ObjectID = require('mongodb').ObjectID;
const dbConnect = require('../db');
const dbCollection = 'orders';
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})


/*
    {
        orders: [
            {
                isBundle,
                cars: {
                    carId,
                    ownerId,

                }
            }
        ],
        renterId
    }
*/
const placeOrders = async (orders, renterId = 1) => {

    if(!orders || !renterId) return { status:400 };
    if(orders.length == 0) return { status:400 };

    for(const order of orders){
        if(order.isBundle){
            createAsBundle(order.cars, order.ownerId, renterId);
        }
        else{
            createAsOrders(order.cars, renterId);
        }
    }

    await db.collection('cart').drop();

    return { status: 201 };
}

const createAsBundle = async (cars, ownerId, renterId) => {
    const bundle = {
        ownerId,
        renterId: renterId,
        status: 'PENDING',
        cars
    };

    await db.collection('bundles').insertOne(bundle);
};

const createAsOrders = async (cars, renterId) => {
    for(const carOrder of cars){
        await db.collection('orders').insertOne({
            carId: carOrder.id,
            ownerId: carOrder.ownerId,
            renterId: renterId,
            status: 'PENDING',
            from: carOrder.from,
            to: carOrder.to,
            startLocation: carOrder.startLocation,
            endLocation: carOrder.endLocation,
            isBundle: false
        });
    }
};

const acceptOrder = async (id) => {
    const order = await db.collection('orders').find({_id: ObjectID(id)});

    if(!order) return { status: '404'}

    await db.collection('orders').updateOne({_id: ObjectID(id)}, {$set:{status: 'PAID'}});
    await db.collection('orders').deleteMany({carId: order.carId});
    await db.collection('bundles').deleteMany({carId: order.carId});
    return { status: '200' };
};

const revokeOrder = async (id) => {

    if(!id) return { status: 400 };

    const result = db.collection('orders').deleteOne({_id:ObjectID(id)});
    
    if(result.deletedCount == 1) {
        return { status: 200 };
    }

    return { status: 404 };
};

const revokeBundle = async (id) => {

    if(!id) return { status: 400 };

    const result = db.collection('bundles').deleteOne({_id:ObjectID(id)});
    
    if(result.deletedCount == 1) {
        return { status: 200 };
    }

    return { status: 404 };
};

const getOrder = async (id) => {

    if(!id) return { status: 400 };

    const order = await db.collection('orders').findOne({_id: ObjectID(id)});

    if(!order){
        return { status: 404 };
    }

    return { status: 200, response: order };
};

const getOrders = async () => {
    return await db.collection('orders').find({}).toArray();
};

const getBundle = async (id) => {

    if(!id) return { status: 400 };

    const bundle = await db.collection('bundles').findOne({_id: ObjectID(id)});

    if(!bundle){
        return { status: 404 };
    }

    return { status: 200, response: bundle };
};

const getBundles = async () => {
    return await db.collection('bundles').find({}).toArray();
}

const addToCart = async (carId, username) => {
    console.log(username);
    const result = await db.collection('cart').insertOne({carId, username});
    if(result.insertedId){
        return {status: 201};
    }

    return {status: 500};
}

const removeFromCart = async (carId, username) => {
    await db.collection('cart').deleteOne({carId, username});
    return {status: 200};
}


const getCart = async (username) => {
    const cart = await db.collection('cart').find({username}).toArray();
    let result = [];
    for(const item of cart){
        const car = await db.collection('cars').findOne({_id: ObjectID(item.carId)});
        if(car)
            result.push(car);
    }

    const groups = groupBy(result, 'ownerId');
    let ret = [];
    Object.keys(groups).forEach((key, i) => {
        const obj = {ownerId: key, cars: groups[key]};
        ret.push(obj);
    });

    return {status: 200, response: ret};
}

function groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
    }, {});
}



module.exports = {
    placeOrders,
    getOrders,
    getBundles,
    getOrder,
    getBundle,
    revokeOrder,
    revokeBundle,
    acceptOrder,
    addToCart,
    removeFromCart,
    getCart
}