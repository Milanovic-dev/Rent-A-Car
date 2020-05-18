const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;

const dbConnect = require('../db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const subscribeAgent = async (args) => {
    
    const agentCollection = await db.collection('agents').findOne({username: args.username});

    if(agentCollection){
        if(bcrypt.compareSync(args.password, agentCollection.password)){
            const accessToken = jwt.sign({"username": args.username}, process.env.JWT_AGENT_SECRET, { algorithm: 'HS256' });
            return {
                accessToken,
                status: 200
            };
        }
    }

    return {
        status: 401
    };
};


const synchronize = async(agent, soapHeader) => {
    
    let result = await verifyToken(soapHeader.accessToken);

    if(result == '401' || result == '400') return result;

    const id = result.id;

    let agentCollection = await db.collection('agents').findOne({_id: ObjectID(id)});

    if(!agentCollection) return '404';

    const collectionName = agentCollection.username;
    console.log(`${collectionName} Synced`);

    // TODO: Sync

    return '200';
};

const recieveUpdate = async ({documentName, action, filter, data, options}, soapHeader) => {

    let verifyResult = await verifyToken(soapHeader.AuthToken).catch(err => console.error(err));

    if(verifyResult == '401' || verifyResult == '400') return verifyResult;
    // TODO: Update versioning
    let result;
    switch(action){
        case 'insertOne':
            result = await db.collection(documentName).insertOne(JSON.parse(data), options);
            if(result.insertedId)
            {
                return { status: '201' };
            }
            break;
        case 'updateOne':
            result = await db.collection(documentName).updateOne(JSON.parse(filter), JSON.parse(data), options);
            if(result.modifiedCount == 1){
                return { status: '200' };
            }
            break;
        case 'deleteOne':
            result = await db.collection(documentName).deleteOne(JSON.parse(filter), options);
            if(result.deletedCount == 1){
                return { status: '200' };
            }
            break;
    }
        
    return { status:'400', errorMessage: 'Wrong action requested.' };
};


const verifyToken = async (token) => {

    if(!token) return '400';

    const result = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_AGENT_SECRET, (err, tokenData) => {
            if(err){
                console.error(err);
                reject('401');
            }
            const username = tokenData;
            resolve(username);
        });
    });
    return result;
}

module.exports = {
    subscribeAgent,
    synchronize,
    recieveUpdate
}