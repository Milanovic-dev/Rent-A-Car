const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;
const fetch = require('node-fetch');
const dbConnect = require('../db');
const colors = require('colors');
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

//{collectionName, data, auth, }
const sync = async (args) => {
    args = JSON.parse(args);
    if(!args.auth) return error('401','No Token.');
    //Verify Token

    const verifyTokenResult = await verifyToken(args.auth.token);
    if(verifyTokenResult == '400') return error('401', 'No Token.');
    if(verifyTokenResult == '401') return error('401', 'Invalid Token.');

    const username = verifyTokenResult.username;

    if(!args.collectionName) return error('400', 'Collection name not specified.');

    const mData = await db.collection(args.collectionName).find({ownerId: username}).sort({_id: -1}).toArray();

    if(args.data == undefined || Object.keys(args.data).length == 0) {
        if(mData.length == 0) {
            return syncData();
        }
        return syncData(mData);
    }

    const diffResult = await diff(args.data, mData);
    const mSync = diffResult.mSync;
    const aSync = diffResult.aSync;

    try{
        for(let i = 0 ; i < mSync.toInsert.length ; i++){
            mSync.toInsert[i]._id = ObjectID(mSync.toInsert[i]._id);
            mSync.toInsert[i].ownerId = username;
            db.collection(args.collectionName).insertOne(mSync.toInsert[i]);
        }
    
        for(let i = 0 ; i < mSync.toUpdate.length ; i++){
            mSync.toUpdate[i]._id = ObjectID(mSync.toUpdate[i]._id);
            mSync.toUpdate[i].ownerId = username;
            db.collection(args.collectionName).replaceOne({_id: mSync.toUpdate[i]._id}, mSync.toUpdate[i]);
        }
    }catch(err){

    }

    return syncData(aSync.toInsert, aSync.toUpdate);
}

const diff = (aData, mData) => {

    const result = {
        mSync: {
            toInsert: [],
            toUpdate: []
        },
        aSync: {
            toInsert: [],
            toUpdate: []
        }
    }

    if(aData.length >= mData.length){
        for(let i = 0 ; i < aData.length ; i++){
            const pair = findPair(aData[i], mData);
            if(pair){
                if(aData[i].version > pair.version){
                    result.mSync.toUpdate.push(aData[i]);
                }else if(aData[i].version < pair.version){
                    result.aSync.toUpdate.push(pair);
                }
            }else{
                result.mSync.toInsert.push(aData[i]);
            }
        }
    }else if(aData.length < mData.length){
        for(let i = 0 ; i < mData.length ; i++){
            const pair = findPair(mData[i], aData);
            if(pair){
                if(mData[i].version > pair.version){
                    result.aSync.toUpdate.push(mData[i]);
                }else if(mData[i].version < pair.version){
                    result.mSync.toUpdate.push(pair);
                }
            }else
            {
                result.aSync.toInsert.push(mData[i]);
            }
        }
    }

    return result;
};


const findPair = (document, data) => {
    for(let i = 0 ; i < data.length ; i++){
        if(data[i]._id == document._id){
            return data[i];
        }
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

const syncData = (toInsert, toUpdate, misc) => {

    if(!toInsert && !toUpdate) {
        return JSON.stringify({toInsert: [], toUpdate: [], status: 200});
    }

    const data = {
        toInsert: toInsert ? toInsert : [],
        toUpdate: toUpdate ? toUpdate : [],
        misc,
        status: 200
    }

    return JSON.stringify(data);
}


const error = (status, reason) => {
    if(!reason) return JSON.stringify({status});
    return JSON.stringify({status, reason});
};

module.exports = {
    subscribeAgent,
    sync
}