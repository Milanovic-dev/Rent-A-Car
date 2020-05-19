const MongoClient = require('mongodb').MongoClient;
const isDocker = require('is-docker');
const soapService = require('./src/soap/soapService');
const soap = require('soap');
var connection;
var db;
var soapClient;
var accessToken;

const hostUrl = process.env.HOST_URL + 'api/webhook';

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

const collection = (collection, sync = true) => {
    return new DbSyncFunctions(collection, sync);
};

const getDb = () => {
    return db;
};

const saveToken = async (token) => {
    let result = await db.collection('user').updateOne({id: 'agentUser'}, {$set: {accessToken: token}}, {upsert: true});
    if(result.modifiedCount == 1){
        console.log(`Saved token: ${token}`);
    }
};

const getToken = async () => {
    if(db){
        let result = await db.collection('user').findOne({id: 'agentUser'});
        return result.accessToken;
    }
};


class DbSyncFunctions {
    constructor(collection, sync){
        this.collection = collection;
        this.sync = sync;
    }

    async insertOne(query, writeConcern) {
        let result = await db.collection(this.collection).insertOne(query, writeConcern).catch(err => console.error(err));
        return result;
    };
  
    async updateOne(filter, update, options) {
        let result = await db.collection(this.collection).updateOne(filter, update, options).catch(err => console.error(err));
        return result;
    };

    async update(filter, update, options) {
        let result = await db.collection(this.collection).update(filter, update, options).catch(err => console.error(err));
        return result;
    }

    async deleteOne(filter, options) {
        let result = await db.collection(this.collection).deleteOne(filter, options).catch(err => console.error(err));
        return result;
    };

    async findOne(query, projection) {
        // TODO: Sync with microservices
        return await db.collection(this.collection).findOne(query, projection).catch(err => console.error(err));
    };

    async find(query, projection) {
        // TODO: Sync with microservices
        return await db.collection(this.collection).find(query, projection).toArray();
    };

    async count() {
        let result = await db.collection(this.collection).count();
        return result;
    }

    async drop(writeConcern) {
        let result = await db.collection(this.collection).drop(writeConcern);
        return result;
    }
};

module.exports = {
    connect,
    collection,
    getDb,
    saveToken,
    getToken
}