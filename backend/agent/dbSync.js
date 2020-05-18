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
    let result = await db.collection('user').findOne({id: 'agentUser'});
    return result.accessToken;
};

const sendUpdate = async (collection, action, filter, data, options) => {
    let hostUrl = 'http://localhost:8080/api/webhook'
    soapClient = await soapService.getClient(`${hostUrl}/getWsdl`).catch(err => { 
        console.error(err);
        console.error(`Cannot /getWsdl from ${hostUrl}`);
    });
    let token = await getToken();
    soapClient.addSoapHeader(`<AuthToken>${token}</AuthToken>`);

    const filterString = filter ? JSON.stringify(filter) : undefined;
    const dataString = data ? JSON.stringify(data) : undefined;
    
    return new Promise((resolve, reject) => {
        soapClient.SyncUpdate({documentName: collection, action, filter: filterString, data: dataString, options}, (err, res) => {
            if(err){
                console.error(err);
                console.error(`Unable to syncUpdate: { action: ${action} collection:${collection}}`);
                resolve(err);
            }
        
            resolve(res);
        });
    });
};

const getUpdate = async (collection, action, filter, options) => {
    let hostUrl = 'http://localhost:8080/api/webhook'
    soapClient = await soapService.getClient(`${hostUrl}/getWsdl`).catch(err => { 
        console.error(err);
        console.error(`Cannot /getWsdl from ${hostUrl}`);
    });
    let token = await getToken();
    soapClient.addSoapHeader(`<AuthToken>${token}</AuthToken>`);

    const filterString = filter ? JSON.stringify(filter) : '';

    return new Promise((resolve, reject) => {
        soapClient.SyncGet({documentName: collection, action, filter: filterString, options}, (err, res) => {
            if(err){
                console.error(err);
                console.error(`Unable to syncGet: { action: ${action} collection:${collection}}`);
                reject(err);
            }
    
            resolve(res);
        });
    })
};

const diff = (collection) => {
    getToken().then(token => {
        if(!token) {
            console.error('Cannot get token from the database, no synchronization.');
            return;
        }

        soapClient.addSoapHeader(`<AuthToken>${token}</AuthToken>`);
    }).catch(err = console.error(err));
};

class DbSyncFunctions {
    constructor(collection, sync){
        this.collection = collection;
        this.sync = sync;
    }

    async insertOne(query, writeConcern) {
        let result = await db.collection(this.collection).insertOne(query, writeConcern).catch(err => console.error(err));
        if(this.sync) sendUpdate(this.collection, 'insertOne', {}, query, writeConcern);
        return result;
    };
  
    async updateOne(filter, update, options) {
        let result = await db.collection(this.collection).updateOne(filter, update, options).catch(err => console.error(err));
        if(this.sync) sendUpdate(this.collection, 'updateOne', filter, update, options);
        return result;
    };

    async update(filter, update, options) {
        let result = await db.collection(this.collection).update(query, update, options).catch(err => console.error(err));
        if(this.sync) sendUpdate(this.collection, 'update', filter, update, options);
        return result;
    }

    async deleteOne(filter, options) {
        let result = await db.collection(this.collection).deleteOne(filter, options).catch(err => console.error(err));
        if(this.sync) sendUpdate(this.collection, 'deleteOne', filter, {}, options);
        return result;
    };

    async findOne(query, projection) {
        // TODO: Sync with microservices
        //let result = await db.collection(this.collection).findOne(query, projection).catch(err => console.error(err));
        let result = await getUpdate(this.collection, 'findOne', query, projection);
        return result;
    };

    async find(query, projection) {
        // TODO: Sync with microservices
        let result = await db.collection(this.collection).find(query, projection).toArray();
        return result;
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