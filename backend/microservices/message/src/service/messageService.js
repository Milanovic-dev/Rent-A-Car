//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../../db');
const dbCollection = 'messages';
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');

let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {

    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

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
const generatePermissionMiddleware = (permission) => {
    return async (req, res, next) => {
        if (typeof req.headers.authorization !== "undefined") {
            let token = req.headers.authorization.split(" ")[1];

            jwt.verify(token, process.env.JWT_SECRET, { algorithm: "HS256" }, (err, user) => {
                res.locals.uid = user.id;
                console.log(err,user);
                if (err) {
                    res.status(401).json({ error: "Not Authorized" });
                    return;
                    //throw new Error("Not Authorized");
                }

                db.collection('users').find({ username: user.id }).toArray((err, result) => {
                    if (err) {
                        res.status(404).json({ error: "Not Found" });
                        return;
                    }

                    if (result && !result.length) {
                        res.status(404).json({ error: "Not Found" });
                        return;
                    }

                    if (result[0].permissions && result[0].permissions.indexOf('*') !== -1) {
                        return next();
                    }

                    if (result[0].permissions && result[0].permissions.indexOf(permission) !== -1) {
                        return next();
                    }

                    res.status(401).json({ error: "Not Authorized" });
                    return;
                });
            });
        } else {
            res.status(401).json({ error: "Not Authorized" });
            return;
            //throw new Error("Not Authorized");
        }
    }

}

const sendMessage = async (authorization, msgObj) => {
    
    if(!authorization) return {status: 401};

    const senderId = await verifyToken(authorization.split(' ')[1]);


    if(msgObj == undefined) return { status: 400 }; 
  

    let result = await db.collection(dbCollection).insertOne({
        ownerId: 'Agent0',
        senderId: senderId,
        receiverId: msgObj.receiverId,
        message: msgObj.message,
        timestamp: Math.floor(new Date().getTime() / 1000)
    });

    if(result.insertedId)
    {
        return {
            response: result.insertedId,
            status: 201
        };
    }
  
    return { status: 500 };
  };


  const getAll = async (authorization, receiverId) => {
    if(!authorization) return {status: 401};

    const senderId = await verifyToken(authorization.split(' ')[1]);

    let result = await db.collection(dbCollection).find({ $or: [{receiverId: receiverId, senderId: senderId}, {receiverId: senderId, senderId: receiverId}]  }).sort({timestamp: 1}).toArray();
  
    return {
        response: result,
        status: 200
    };
  };

  const removeMessage = async (authorization, id) => {
    if(!authorization) return {status: 401};

    const senderId = await verifyToken(authorization.split(' ')[1]);

    let result = await db.collection(dbCollection).deleteOne(
        {
            _id: ObjectID(id),
            senderId: senderId
        }
    );
  
    if(result.deletedCount == 1){
        return { status: 200 };
    }
  
    return { status: 404 };
  };
  
module.exports = {
    sendMessage: sendMessage,
    removeMessage: removeMessage,
    getAll: getAll,
    generatePermissionMiddleware
};
