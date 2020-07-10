const ObjectID = require('mongodb').ObjectID;

const dbConnect = require('../../db');
const dbCollection = 'pricelists';
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;

}).catch((e) => {
    console.log(`DB error: ${e}`);
})

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

    throw 'Cannot insert';
};

const updatePricelist = async (ps) => {

    if(!ps) return { status: 400 }; 

    let dbPs = await db.collection(dbCollection).findOne(
        {
            _id: ObjectID(ps._id)
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
                pricePerDay: ps.pricePerDay,
                pricePerKM: ps.pricePerKM,
                priceCDWP: ps.priceCDWP,
                sale: ps.sale
            }
        }
    );
        console.log(result);
    if(result.modifiedCount == 1){
        return { status:200 };
    }

    return { status: 400 };
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
    await db.sync();
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