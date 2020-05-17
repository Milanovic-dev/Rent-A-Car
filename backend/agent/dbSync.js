const MongoClient = require('mongodb').MongoClient;
const isDocker = require('is-docker');
const soapService = require('./src/soap/soapService');
const soap = require('soap');
var connection;
var db;
var soapClient;
var accessToken;

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
    let hostUrl = 'http://localhost:8080/api/webhook'
    soapClient = await soapService.getClient(`${hostUrl}/getWsdl`).catch(err => { 
        console.error(err);
        console.error(`Cannot /getWsdl from ${hostUrl}`);
    });

    db = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
        .catch(err => console.error(err));
}

const collection = (collection) => {
    return new DbSyncFunctions(collection);
};

const getDb = () => {
    return db;
};

const saveToken = async (token) => {
    await db.collection('user').updateOne({id: 'agentUser'}, {$set: {accessToken: token}}, {upsert: true});
};

const getToken = async () => {
    let result = await db.collection('user').findOne({id: 'agentUser'});
    return result.accessToken;
};

class DbSyncFunctions {
    constructor(collection){
        this.collection = collection;
    }

    async insertOne(query, writeConcern) {
        // TODO: Sync with microservices
        let result = await db.collection(this.collection).insertOne(query, writeConcern).catch(err => console.error(err));
        return result;
    };

    async insert(documents, options){
        // TODO: Sync with microservices
        let result = await db.collection(this.collection).insert(documents, options).catch(err => console.error(err));
        return result;
    }
    
    async updateOne(filter, update, options) {
        // TODO: Sync with microservices
        let result = await db.collection(this.collection).updateOne(filter, update, options).catch(err => console.error(err));
        return result;
    };

    async update(query, update, options) {
        // TODO: Sync with microservices
        let result = await db.collection(this.collection).update(query, update, options).catch(err => console.error(err));
        return result;
    }

    async deleteOne(filter, options) {
        // TODO: Sync with microservices
        let result = await db.collection(this.collection).deleteOne(filter, options).catch(err => console.error(err));
        return result;
    };

    async replaceOne(filter, replacement, options) {
        // TODO: Sync with microservices
        let result = await db.collection(this.collection).replaceOne(filter, replacement, options).catch(err => console.error(err));
        return result;
    }

    async findOne(query, projection) {
        // TODO: Sync with microservices
        let result = await db.collection(this.collection).findOne(query, projection).catch(err => console.error(err));
        return result;
    };

    async remove(query, justOne) {
        // TODO: Sync with microservices
        let result = await db.collection(this.collection).remove(query, justOne).catch(err => console.error(err));
        return result;
    }

    async find(query, projection) {
        // TODO: Sync with microservices
        let result = await db.collection(this.collection).find(query, projection).catch(err => console.error(err));
        return result.toArray();
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