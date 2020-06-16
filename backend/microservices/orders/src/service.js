//env
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
const placeOrders = ({orders, renterId}) => {

    if(!orders || !renterId) return { status:400 };
    if(orders.length == 0) return { status:400 };

    for(const order of orders){
        if(order.isBundle){
            createAsBundle(order, renterId);
        }
        else{
            createAsOrders(order, renterId);
        }
    }

    return { status: 201 };
}

const createAsBundle = async (order, renterId) => {
    const bundle = {
        ownerId: order.ownerId,
        renterId: renterId,
        approved: false,
        cars: order.carOrders
    };

    await db.collection('bundles').insertOne(bundle);
};

const createAsOrders = async (order, renterId) => {
    for(const carOrder of order.carOrders){
        await db.collection('orders').insertOne({
            carId: carOrder.id,
            ownerId: order.ownerId,
            renterId: renterId,
            approved: false,
            from: carOrder.from,
            to: carOrder.to,
            startLocation: carOrder.startLocation,
            endLocation: carOrder.endLocation,
            isBundle: false
        });
    }
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

module.exports = {
    placeOrders,
    getOrders,
    getBundles,
    getOrder,
    getBundle,
    revokeOrder,
    revokeBundle
}