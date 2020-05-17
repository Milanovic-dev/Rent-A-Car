const ObjectID = require('mongodb').ObjectID;

const db = require('../../dbSync');

const dbCollection = 'pricelist';
db.connect();

const createPricelist = async (ps) => {

    if(!ps) return { status: 400 };

    let result = await db.collection(dbCollection).insertOne(ps);
    if(result.insertedId)
    {
        return {
            response: result.insertedId,
            status: 201
        };
    }

    return { status: 500 };
};

const updatePricelist = async (ps) => {

    if(!ps) return { status: 400 }; 

    let dbPs = await db.collection(dbCollection).findOne(
        {
            _id: ObjectID(car._id)
        }
    );

    if(!dbPs){
        return { status:404 };
    }

    let result = await db.collection(dbCollection).updateOne(
        {
            _id: ObjectID(ps._id)
        },
        {
            $set: {
                price: ps.price ? ps.price : dbPs.price
            }
        }
    );

    if(result.modifiedCount == 1){
        return { status:200 };
    }

    return { status: 404 };
};

const removePricelist = async (id) => {
    let result = await db.collection(dbCollection).deleteOne(
        {
            _id: ObjectID(id)
        }
    );

    if(result.deletedCount == 1){
        return { status: 200 };
    }

    return { status: 404 };
};

const getPricelist = async (id) => {
    let result = await db.collection(dbCollection).findOne(
        {
            _id: ObjectID(id)
        }
    );

    if(result){
        return {
            response: result,
            status: 200
        };
    }

    return { status: 404 };
};

const getAll = async () => {
    let result = await db.collection(dbCollection).find().toArray();

    return {
        response: result,
        status: 200
    };
};

module.exports = {
    create: createPricelist,
    update: updatePricelist,
    remove: removePricelist,
    get: getPricelist,
    getAll
};