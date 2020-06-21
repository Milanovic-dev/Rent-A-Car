//env
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
//database
const ObjectID = require('mongodb').ObjectID;
const dbConnect = require('../db');
const { GridFSBucket } = require('mongodb');
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
const placeOrders = async (orders, authorization) => {

    if(!authorization) return {status: 401};

    const renterId = await verifyToken(authorization.split(' ')[1]);

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

    let sum = 0;

    for(const car of cars){
        sum += parseInt(car.price);
    }

    sum = sum - ((sum/10) * 2);

    const carIds = [];

    for(const car of cars){
        carIds.push(car._id);
    }

    const bundle = {
        ownerId,
        renterId: renterId,
        status: 'PENDING',
        price: sum,
        finished: false,
        carIds
    };

    await db.collection('bundles').insertOne(bundle);
};

const createAsOrders = async (cars, renterId) => {
    for(const carOrder of cars){
        await db.collection('orders').insertOne({
            carId: carOrder._id,
            ownerId: carOrder.ownerId,
            renterId: renterId,
            status: 'PENDING',
            from: carOrder.from,
            to: carOrder.to,
            startLocation: carOrder.startLocation,
            endLocation: carOrder.endLocation,
            isBundle: false,
            finished: false
        });
    }
};

const acceptOrder = async (id) => {
    if(!id) return { status:400 }
    const order = await db.collection('orders').findOne({_id: ObjectID(id)});

    let res = await db.collection('orders').updateOne({_id: ObjectID(id)}, {$set:{status: 'PAID'}});
    
    
    if(res.modifiedCount == 1){
        let otherOrders = await db.collection('orders').find({_id: {$ne: ObjectID(id)}, carId: order.carId}).toArray();
        for(const order of otherOrders){
            await db.collection('orders').updateOne({_id:ObjectID(order._id)}, {$set:{status: 'CANCELED'}});
        }
        
        const otherBundles = await db.collection('bundles').find({carIds: order.carId}).toArray();
        for(const bundle of otherBundles){
            await db.collection('bundles').updateOne({_id: ObjectID(bundle._id)}, {$set:{status: 'CANCELED'}});
        }

        return {status: 200};
    }

    return { status: 404 };
};

const declineOrder = async (id) => {
    const order = await db.collection('orders').find({_id: ObjectID(id)});

    if(!order) return { status: '404'}

    await db.collection('orders').updateOne({_id: ObjectID(id)}, {$set:{status: 'CANCELED'}});
    return { status: '200' };
}

const revokeOrder = async (id) => {

    if(!id) return { status: 400 };

    const result = await db.collection('orders').deleteOne({_id:ObjectID(id)});

    if(result.deletedCount == 1) {
        return { status: 200 };
    }

    return { status: 404 };
};

const revokeBundle = async (id) => {

    if(!id) return { status: 400 };

    const result = await db.collection('bundles').deleteOne({_id:ObjectID(id)});
    
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

    const car = await db.collection('cars').findOne({_id: ObjectID(order.carId)});
    order.car = car;
    return { status: 200, response: order };
};

const getBundle = async (id) => {

    if(!id) return { status: 400 };

    const bundle = await db.collection('bundles').findOne({_id: ObjectID(id)});

    if(!bundle){
        return { status: 404 };
    }

    const cars = [];

    for(const carId of bundle.carIds){
        const car = await db.collection('cars').findOne({_id:ObjectID(carId)});
        cars.push(car);
    }

    bundle.cars = cars;
    return { status: 200, response: bundle };
};

const getOrders = async (authorization) => {
    if(!authorization) return {status: 401};

    const id = await verifyToken(authorization.split(' ')[1]);

    const result = await db.collection('orders').find({renterId: id}).toArray();

    for(let order of result){
        const car = await db.collection('cars').findOne({_id: ObjectID(order.carId)});
        order.car = car;
    }

    return {status: 200, response: result};
};


const getBundles = async (authorization) => {
    if(!authorization) return {status: 401};

    const id = await verifyToken(authorization.split(' ')[1]);
    const result = await db.collection('bundles').find({renterId: id}).toArray();

    for(let bundle of result){
        bundle.cars = [];
        for(let carId of bundle.carIds){
            const car = await db.collection('cars').findOne({_id: ObjectID(carId)});
            bundle.cars.push(car);
        }
    }

    return {status: 200, response:result};
}

const getOrderRequests = async (authorization) => {
    if(!authorization) return {status: 401};

    const id = await verifyToken(authorization.split(' ')[1]);
    let result = await db.collection('orders').find({ownerId: id}).toArray();

    for(let order of result){
        const car = await db.collection('cars').findOne({_id: ObjectID(order.carId)});
        order.car = car;
    }

    return {status: 200, response: result};
}

const getBundleRequests = async (authorization) => {
    if(!authorization) return {status: 401};

    const id = await verifyToken(authorization.split(' ')[1]);
    let result = await db.collection('bundles').find({ownerId: id}).toArray();

    for(let bundle of result){
        bundle.cars = [];
        for(let carId of bundle.carIds){
            const car = await db.collection('cars').findOne({_id: ObjectID(carId)});
            bundle.cars.push(car);
        }
    }

    return {status: 200, response: result};
}

const addToCart = async (carId, authorization) => {
    
    if(!authorization) return {status: 401};

    const id = await verifyToken(authorization.split(' ')[1]);

    const item = await db.collection('cart').findOne({carId, id});
    const order = await db.collection('orders').findOne({carId, renterId: id});

    if(item || order){
        return {status: 422}
    }

    const result = await db.collection('cart').insertOne({carId, id});
    if(result.insertedId){
        return {status: 201};
    }

    return {status: 500};
}

const removeFromCart = async (carId, authorization) => {
    if(!authorization) return {status: 401};

    const id = await verifyToken(authorization.split(' ')[1]);

    await db.collection('cart').deleteOne({carId, id});
    return {status: 200};
}


const getCart = async (authorization) => {
    if(!authorization) return {status: 401};

    const id = await verifyToken(authorization.split(' ')[1]);

    const cart = await db.collection('cart').find({id}).toArray();
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

const getCartSize = async (authorization) => {
    if(!authorization) return {status: 401};

    const id = await verifyToken(authorization.split(' ')[1]);

    const result = await db.collection('cart').find({id}).toArray();

    return {status: 200, response: {size: result.length}}
}

function groupBy(arr, property) {
    return arr.reduce(function(memo, x) {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
    }, {});
}

const verifyToken = async (token) => {

    if(!token) return '400';

    const result = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, tokenData) => {
            if(err){
                console.error(err);
                reject('401');
            }
            const username = tokenData;
            resolve(username.id);
        });
    });
    return result;
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
    declineOrder,
    addToCart,
    removeFromCart,
    getCart,
    getCartSize,
    getOrderRequests,
    getBundleRequests
}