const ObjectID = require('mongodb').ObjectID;
const dbCollection = 'messages';
const dbConnect = require('../../db');
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
        jwt.verify(token, '-###ejirjewiori%^*#ewjcr123iwercm872371###-', (err, tokenData) => {
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


const sendMessage = async (authorization, msgObj) => {
    
    if(!authorization) return {status: 401};

    const senderId = await verifyToken(authorization.split(' ')[1]);


    if(msgObj == undefined) return { status: 400 }; 
  

    let result = await db.collection(dbCollection).insertOne({
        senderId: senderId,
        receiverId: msgObj.receiverId,
        message: msgObj.message,
        timestamp: Math.floor(new Date().getTime() / 1000)
    });

    if(result.insertedId)
    {
        db.sync();

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
        db.sync();

        return { status: 200 };
    }
  
    return { status: 404 };
  };
  
module.exports = {
    sendMessage: sendMessage,
    removeMessage: removeMessage,
    getAll: getAll,
};
