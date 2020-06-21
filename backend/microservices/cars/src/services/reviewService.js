//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../../db');
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');

const dbCollection = 'reviews';

let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
    .then((conn) => {
        db = conn;
    }).catch((e) => {
        console.log(`DB error: ${e}`);
    })
const verifyToken = async (token) => {

    if (!token) return '400';

    const result = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, tokenData) => {
            if (err) {
                console.error(err);
                reject('401');
            }
            const username = tokenData;
            resolve(username.id);
        });
    });
    return result;
}

const createReview = async (review, authorization) => {

    if (!review) return { status: 400 };

    if (!authorization) return { status: 401 };

    const userId = await verifyToken(authorization.split(' ')[1]);

    review.userId = userId;
    review.status = 0;

    let result = await db.collection(dbCollection).insertOne(review);
    if (result.insertedId) {
        return {
            response: result.insertedId,
            status: 201
        };
    }

    return { status: 500 };
};
const allowReview = async (id) => {

    // await db.collection(dbCollection).updateOne({_id: ObjectID(id)}, {$set: {
    //     status: 2
    // }} );

    // if(result.modifiedCount == 1){
    //     return { status:200 };
    // }

    // return { status: 404 };


    let dbReview = await db.collection(dbCollection).findOne(
        {
            _id: ObjectID(id)
        }
    );

    if (!dbReview) {
        return { status: 404 };
    }

    let result = await db.collection(dbCollection).updateOne(
        {
            _id: ObjectID(id)
        },
        {
            $set: {
                status: 2,

            }
        }
    );

    if (result.modifiedCount == 1) {
        return { status: 200 };
    }

    return { status: 404 };

};
const disallowReview = async (id) => {

    let dbReview = await db.collection(dbCollection).findOne(
        {
            _id: ObjectID(id)
        }
    );

    if (!dbReview) {
        return { status: 404 };
    }

    let result = await db.collection(dbCollection).updateOne(
        {
            _id: ObjectID(id)
        },
        {
            $set: {
                status: 1,

            }
        }
    );

    if (result.modifiedCount == 1) {
        return { status: 200 };
    }

    return { status: 404 };

};


const getReview = async (id) => {
    let result = await db.collection(dbCollection).find({ carId: id }).toArray();
    if (result) {
        return {
            response: result,
            status: 200
        };
    }

    return { status: 404 };
};

const removeReview = async (id) => {
    let result = await db.collection(dbCollection).deleteOne(
        {
            _id: ObjectID(id)
        }
    );

    if (result.deletedCount == 1) {
        return { status: 200 };
    }

    return { status: 404 };
};

const getAllPending = async () => {
    let result = await db.collection(dbCollection).findAll(
        {
            status: 'pending'
        }
    ).toArray();

    if (result) {
        return {
            response: result,
            status: 200
        };
    }

    return { status: 404 };
};

const getAll = async () => {
    let result = await db.collection(dbCollection).find().toArray();
    for (let i = 0; i < result.length; i++) {
        let car = await db.collection('cars').find({ _id: ObjectID(result[i].carId) }).toArray();
        result[i].car = car[0];
          let user = await db.collection('users').find({ username : result[i].userId}).toArray();
          result[i].user = user[0];

    }
    console.log(result);

    return {
        response: result,
        status: 200
    };
};

module.exports = {
    create: createReview,
    pending: getAllPending,
    get: getReview,
    remove: removeReview,
    allow: allowReview,
    disallow: disallowReview,
    getAll
};
