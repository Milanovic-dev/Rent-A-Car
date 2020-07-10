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

        db.sync();
        return {status: 200};
    }

    return { status: 404 };
}
const finishOrder = async (id) => {

    if(!id) return { status:400 }
    const order = await db.collection('orders').findOne({_id: ObjectID(id)});

    let res = await db.collection('orders').updateOne({_id: ObjectID(id)}, {$set:{status: 'FINISHED'}});
    
    
    if(res.modifiedCount == 1){
        // let otherOrders = await db.collection('orders').find({_id: {$ne: ObjectID(id)}, carId: order.carId}).toArray();
 
        // for(const order of otherOrders){
        //     await db.collection('orders').updateOne({_id:ObjectID(order._id)}, {$set:{status: 'CANCELED'}});
        // }

        // const otherBundles = await db.collection('bundles').find({carIds: order.carId}).toArray();
        // for(const bundle of otherBundles){
        //     await db.collection('bundles').updateOne({_id: ObjectID(bundle._id)}, {$set:{status: 'CANCELED'}});
        // }

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

const acceptBundle = async (id) => {
    if(!id) return { status:400 }

    const bundle = await db.collection('bundles').findOne({_id:ObjectID(id)});
    const res = await db.collection('bundles').updateOne({_id: ObjectID(id)}, {$set:{status: 'PAID'}});

    if(res.modifiedCount == 1){
        for(const carId of bundle.carIds){
            const otherBundles = await db.collection('bundles').find({_id: {$ne: ObjectID(id)}, carIds: carId}).toArray();
            for(const bundle of otherBundles){
                await db.collection('bundles').updateOne({_id: ObjectID(bundle._id)}, {$set:{status: 'CANCELED'}});
            }
    
            const otherOrders = await db.collection('orders').find({carId}).toArray();
            for(const order of otherOrders){
                await db.collection('orders').updateOne({_id: ObjectID(order._id)}, {$set:{status: 'CANCELED'}});
            }
        }
        
        db.sync();
        return {status: 200};
    }

    return {status: 404 };
}

const declineBundle = async (id) => {
    if(!id) return { status:400 }

    const res = await db.collection('bundles').updateOne({_id: ObjectID(id)}, {$set:{status: 'CANCELED'}});

    if(res.modifiedCount == 1){
        db.sync();
        return {status: 200};
    }

    return { status: 404 };
}
const finishBundle = async (id) => {
    if(!id) return { status:400 }

    const res = await db.collection('bundles').updateOne({_id: ObjectID(id)}, {$set:{status: 'FINISHED'}});

    if(res.modifiedCount == 1){
        db.sync();
        return {status: 200};
    }

    return { status: 404 };
}
const getAll = async () => {
    await db.sync();
    let res = await db.collection('orders').find({}).toArray();

    for(let order of res){
        const car = await db.collection('cars').findOne({_id: ObjectID(order.carId)});
        order.car = car;
    }

    return {status: 200, response: res};
}

const getAllBundles = async () => {
    await db.sync();
    let res = await db.collection('bundles').find({}).toArray();

    for(let bundle of res){
        bundle.cars = []
        for(let carId of bundle.carIds){
            const car = await db.collection('cars').findOne({_id: ObjectID(carId)});
            bundle.cars.push(car);
        }
    }

    return {status: 200, response: res};
}

module.exports = {
    getAll,
    getAllBundles,
    acceptOrder,
    finishOrder,
    declineOrder,
    acceptBundle,
    declineBundle,
    finishBundle
}