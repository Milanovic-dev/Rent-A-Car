const MongoClient = require('mongodb').MongoClient;
const isDocker = require('is-docker');
const soapService = require('./src/soap/soapService');
var connection;
var db;
var soapClient;

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
    let hostUrl = 'http://localhost:4000'
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

class DbSyncFunctions {
    constructor(collection){
        this.collection = collection;
    }

    async insertOne(data) {
        // TODO: Sync with microservices
        return await db.collection(this.collection).insertOne(data);
    };
    
    async updateOne(data) {
        // TODO: Sync with microservices
        return await db.collection(this.collection).updateOne(data);
    };

    async update(data) {
        // TODO: Sync with microservices
        return await db.collection(this.collection).update(data);
    }

    async deleteOne(data) {
        // TODO: Sync with microservices
        return await db.collection(this.collection).deleteOne(data);
    };

    async replaceOne(data) {
        // TODO: Sync with microservices
        return await db.collection(this.collection).replaceOne(data);
    }

    async findOne(data) {
        // TODO: Sync with microservices
        return await db.collection(this.collection).findOne(data);
    };

    async find(data) {
        // TODO: Sync with microservices
        return await db.collection(this.collection).find(data).ToArray();
    };

    async count(data) {
        return await db.collection(this.collection).count();
    }
};

module.exports = {
    connect,
    collection,
    db
}