const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;
const fetch = require('node-fetch');
const colors = require('colors');
const dbConnect = require('../db');
const { ObjectId } = require('mongodb');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})


const createAgent = async ({username, password}) => {
    if(!username || !password) return {status: 400};

    const pass = bcrypt.hashSync(password, 10);
    let result = await db.collection('agents').insertOne({username, password: pass});

    if(result.insertedId){
        return {status: 201};
    }

    return {status: 500};
}

const subscribeAgent = async (args) => {

    const agent = await db.collection('agents').findOne({username: args.username});

    if(agent){
        if(bcrypt.compareSync(args.password, agent.password)){
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

//{data, auth}
const sync = async (args) => {
    args = JSON.parse(args);
    if(!args.auth) return error('401','No Token.');

    const verifyTokenResult = await verifyToken(args.auth.token);
    if(verifyTokenResult == '400') return error('401', 'No Token.');
    if(verifyTokenResult == '401') return error('401', 'Invalid Token.');

    const username = verifyTokenResult.username;

    const mData = await db.collection('changes').find({ownerId: username}).toArray();
    let result = await updateData(args.data, username);

    if(result.error) {
        return error(500, 'Error while performing updates');
    }
    try{
        db.getDirectDb().collection('changes').deleteMany({ownerId: username});
    } catch(err){
        return error(500, err);
    }

    return syncData(mData);
}

const updateData = async (aData, username) => {

    try{
        for(let i = 0 ; i < aData.length ; i++) {
            const change = aData[i];
            const coll = change.collName;
            for(let j = 0 ; j < change.toInsert.length ; j++){
                change.toInsert[j]._id = ObjectId(change.toInsert[j]._id);
                change.toInsert[j].ownerId = username;
                await db.getDirectDb().collection(coll).insertOne(change.toInsert[j]);
            }
            for(let j = 0 ; j < change.toUpdate.length ; j++){
                if(change.toUpdate[j].filter._id){
                    change.toUpdate[j].filter._id = ObjectID(change.toUpdate[j].filter._id);
                }
                change.toUpdate[j].ownerId = username;
                await db.getDirectDb().collection(coll).updateMany(change.toUpdate[j].filter, {$set:change.toUpdate[j].update});
            }
            for(let j = 0 ; j < change.toRemove.length; j++){
                if(change.toRemove[j]._id){
                    change.toRemove[j]._id = ObjectID(change.toRemove[j]._id);
                }
                await db.getDirectDb().collection(coll).deleteMany(change.toRemove[j]);
            }
        }
        return {};
    } catch(err){
        console.error(err);
        return {error: err}
    }
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

const syncData = (updates, misc) => {
    return JSON.stringify({status: 200, updates, misc});
}


const error = (status, reason) => {
    if(!reason) return JSON.stringify({status});
    return JSON.stringify({status, reason});
};

module.exports = {
    subscribeAgent,
    sync,
    createAgent
}