const ObjectID = require('mongodb').ObjectID;
const dbCollection = 'tracking';
const dbConnect = require('../../db');
const moment = require('moment');
const jwt = require('jsonwebtoken');

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
        jwt.verify(token, '-###ejirjewiori%^*#ewjcr123iwercm872371###-', (err, tokenData) => {
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



const get = async (id) => {
    try {
        await db.sync();
    } catch (err) {

    }
    let result = await db.collection(dbCollection).find(
        {
            carId: id
        }
    ).toArray();

    if (result) {
        return {
            response: result,
            status: 200
        };
    }

    return { status: 404 };
}

module.exports = {
    get: get,
};
