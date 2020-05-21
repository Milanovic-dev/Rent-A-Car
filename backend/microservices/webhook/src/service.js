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

const sendRequest = async({path, httpMethod, body}, soapHeader) => {

    let ret = {
        path,
        httpMethod
    };

    let verifyRequest = verifyToken(soapHeader.AuthToken);
    if(verifyRequest == '400' || verifyRequest == '401') 
    {
        ret.status = verifyRequest;
        res.errMessage = 'Token not valid'
        return ret;
    }

    const bodyString = '';

    if(body)
        bodyString = JSON.stringify(body);

    let response;

    const pathSplit = path.split('/');
    const pathSplit2 = path.split(pathSplit[2])
    const realPath = `http://${pathSplit[2]}:4000${pathSplit2[1]}`;

    if(httpMethod === 'get'){
        response = await fetch(realPath, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': soapHeader.AuthToken
            }
        });
    }
    else
    {
        response = await fetch(path, {
            method: httpMethod,
            body: bodyString,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': soapHeader.AuthToken
            }
        })
    }
 
    if(parseInt(response.status)/ 100 == 2){
        const updateJSON = response.json();

        ret.status = response.status;
        ret.update = updateJSON;
        return ret;
    }

    ret.status = response.status;
    ret.errMessage = response.errMessage;
    return ret;
}

const getUpdate = async ({collectionName, action, filter, diffData}, soapHeader) => {
    let verifyResult = await verifyToken(soapHeader.AuthToken);
    let ret = {
        collectionName,
        action,
        status: '200'
    }

    if(verifyResult == ('400' || '401')) {
        ret.status = verifyResult;
        ret.message = 'Unauthorized. Invalid token';
        return ret;
    } 

    if(!diffData) diffData = [];

    let diffResult = await diff(collectionName, verifyResult.username, filter, diffData);

    if(diffResult){
        if(diffResult.length == 0){
            ret.message = 'Nothing to update';
            return ret;
        }
        else
        {
            ret.message = `${diffResult.length} things to update.`;
            ret.update = diffResult
            return ret;
        }
    }

    ret.status = '500';
    ret.message = 'Something went wrong.';
    return ret;
};


const diff = async (collectionName, username, filter, agentDocuments) => {

    const query = {};
    if(filter) {
        query = JSON.parse(filter);
    }
    
    query['ownerId'] = username;
    let serviceDocuments = await db.collection(collectionName).find(query).sort({_id: 1}).toArray();

    let ret = [];

    for(let i = 0 ; i < serviceDocuments.length ; i++){
        if(i < agentDocuments.length){
            if(agentDocuments[i].version < serviceDocuments[i].version){
                ret.push(serviceDocuments[i]);
            }
        }
        else
        {
            ret.push(serviceDocuments[i]);
        }
    }   
    
    return ret;
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
    sendRequest,
    getUpdate
}