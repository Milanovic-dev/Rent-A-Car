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

    let dataJSON = {};
    let filterJSON = {};

    if(data)
        dataJSON = JSON.parse(data);

    if(filter)
        filterJSON = JSON.parse(filter);

        
        // TODO: Update versioning
        let result;
        switch(action){
            case 'insertOne':
            if(dataJSON) {
                if(!dataJSON.ownerId) {
                    dataJSON['ownerId'] = verifyResult.username;
                }

                if(!dataJSON.version) {
                    dataJSON['version'] = 1;
                }
            }
            
            result = await db.collection(documentName).insertOne(dataJSON, options);
            if(result.insertedId)
            {
                return { status: '201' };
            }
            return { status: '400', errorMessage: 'Db could not insert'};
        case 'updateOne':
            if(filterJSON) {
                if(!filterJSON.ownerId) {
                    filterJSON['ownerId'] = verifyResult.username;
                }
            }

            if(dataJSON){
                if(!dataJSON.$inc){
                    dataJSON['$inc'] = {version: 1};
                }
            }
            
            result = await db.collection(documentName).updateOne(filterJSON, dataJSON, options);
            if(result.modifiedCount == 1){
                return { status: '200' };
            }
            return { status: '400', errorMessage: 'Db didnt find anything to update'};
        case 'deleteOne':
            if(filterJSON) {
                if(!filterJSON.ownerId) {
                    filterJSON['ownerId'] = verifyResult.username;
                }
            }
            result = await db.collection(documentName).deleteOne(filterJSON, options);
            if(result.deletedCount == 1){
                return { status: '200' };
            }
            return { status: '400', errorMessage: 'Db didnt find anything to delete'};
        case 'update':
            if(filterJSON) {
                if(!filterJSON.ownerId) {
                    filterJSON['ownerId'] = verifyResult.username;
                }
            }
            if(dataJSON){
                if(!dataJSON.$inc){
                    dataJSON['$inc'] = {version: 1};
                }
            }
            result = await db.collection(documentName).update(filterJSON, dataJSON, options);
            if(result.writeConcernError){
                return {status:'400', errorMessage:result.writeConcernError.errmsg};
            }
            return { status: '200' };
    }
        
    return { status:'400', errorMessage: 'Wrong action requested.' };
};

const getUpdate = async ({documentName, action, filter, options}, soapHeader) => {
 
    let verifyResult = await verifyToken(soapHeader.AuthToken).catch(err => console.error(err));

    if(verifyResult == '401' || verifyResult == '400') return verifyResult;

    let filterJSON = {};

    if(filter)
        filterJSON = JSON.parse(filter);

    let result;
    switch(action){
        case 'findOne':
            if(filterJSON) {
                if(!filterJSON.ownerId) {
                    filterJSON['ownerId'] = verifyResult.username;
                }
            }
            result = await db.collection(documentName).findOne(filterJSON, options);
            if(result){
                return { status: '200', response: result};
            }
            return { status: '404' };
        case 'find':
            if(filterJSON) {
                if(!filterJSON.ownerId) {
                    filterJSON['ownerId'] = verifyResult.username;
                }
            }
            result = await db.collection(documentName).find(filterJSON, options).toArray();
            if(result){
                if(result.length > 0){
                    return { status: '200', response: result};
                }
            }
            return { status: '404' };
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

module.exports = {
    subscribeAgent,
    synchronize,
    recieveUpdate,
    getUpdate
}