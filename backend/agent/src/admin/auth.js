const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let db;
const dbConnect = require('../db');
dbConnect()
.then((conn) => {
    db = conn;
})
.catch((e) => {
    console.log('DB error')
})

const login = async (username, password) => {        
    let admin = await db.collection('admins').find({ username: username }).toArray();

    if (!admin.length) {
        return {
            response: {
                error: 'User not exists'
            },
            status: 404
        };

    } else {
        if (bcrypt.compareSync(password, admin[0].pk)) {
            let token = jwt.sign({ "id": admin[0]._id }, constants.jwtSecretKey, { algorithm: 'HS256' });
            return {
                response: {
                    token: token
                },
                status: 200
            };

        } else {
            return {
                response: {
                    error: 'Wrong creditials'
                },
                status: 400
            };

        }
    }
}

module.exports = {
    login
}
