const MongoClient = require('mongodb').MongoClient;
const isDocker = require('is-docker');
const { getClient } = require('./src/soap/soapService');
require('colors');
const { ObjectID } = require('mongodb');
var connection;
var db;




const connectToDB = (username, password, server, dbName) => {
    return new Promise((resolve, reject) => {
        if (connection)
        resolve(connection)
        
        const uri = isDocker() ? `mongodb://db/${dbName}` : `mongodb://${username}:${encodeURIComponent(password)}@${server}/${dbName}`;
        
        MongoClient.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }, (err, db) => {
            if (err)
            reject(err)
            
            connection = db.db(dbName);
            resolve(connection) 
        })
        
    })
}

const connect = async () => {  
    db = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
    .catch(err => console.error(err));
}

connect();

const getDb = () => {
    return db;
};

const saveToken = async (token) => {
    let result = await db.collection('user').updateOne({id: 'agentUser'}, {$set: {accessToken: token}}, {upsert: true});
};

const getToken = async () => {
    if(db){
        let result = await db.collection('user').findOne({id: 'agentUser'});
        return result.accessToken;
    }
};

const sync = async (collectionName) => {
    const timestamp = Date.now();
    const soapClient = await getClient();
    const accessToken = await getToken();

    const diffData = await db.collection(collectionName).find({}).sort({_id: -1}).toArray();   
    const requestBody = JSON.stringify({collectionName, data:diffData, auth:{token: accessToken}});

    soapClient.Synchronize(requestBody, async (err, res) => {
        if(err){
            console.error(err.Fault);
            console.log(`Sync[${collectionName}]: `.yellow + ` failed (SoapError)`.red);
        }
        
        const responseBody = JSON.parse(res);
        
        if(!responseBody){
            return;
        }
        
        if(responseBody.status/100 !== 2){
            console.log(`Sync[${collectionName}]: `.yellow + ` failed (Status: ${responseBody.status} Reason: ${responseBody.reason})`.red);
            return;
        }
        
        let endTimestamp;
        
        for(let i = 0 ; i < responseBody.toInsert.length ; i++){
            responseBody.toInsert[i]._id = ObjectID(responseBody.toInsert[i]._id);
            await db.collection(collectionName).insertOne(responseBody.toInsert[i]);
        }
        
        for(let i = 0 ; i < responseBody.toUpdate.length ; i++){
            responseBody.toUpdate[i]._id = ObjectID(responseBody.toUpdate[i]._id);
            await db.collection(collectionName).replaceOne({_id: responseBody.toUpdate[i]._id}, responseBody.toUpdate[i]);
        }

        endTimestamp = Date.now();
        console.log(`Sync[${collectionName}]:` .yellow + ` done(${endTimestamp-timestamp}ms)`.green);    
    })
}


const syncAll = async () => {
    await sync('cars');
}

module.exports = {
    connect,
    getDb,
    saveToken,
    getToken,
    syncAll,
    sync
}