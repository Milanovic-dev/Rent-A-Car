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

const getUpdate = async (query, projection, collectionName, action) => {
    return new Promise(async (resolve, reject) => {
        let client = await soap.createClientAsync('http://localhost:8080/api/webhook/getWsdl', {});
        let token = await getToken();
        client.addSoapHeader(`<AuthToken>${token}</AuthToken>`)

        let dbResult = await db.collection(collectionName).find(query, projection).sort({_id: 1}).toArray();
        let diffData = [];

        for(let item of dbResult){
            diffData.push({_id:item._id, version:item.version});
        }
        
        if(diffData.length == 0){
            diffData = [{}];
        }

        client.GetUpdate({collectionName: collectionName, action, filter: JSON.stringify(query), diffData}, async (err, res) => {
            if(err){
                console.error(err);
                reject(err);
            }
            let ret;
            const result = JSON.parse(res);
            console.log(result);
            if(result.status == '200'){
                if(result.update){
                    for(let insert of result.update.toInsert){
                        await db.collection(collectionName).insertOne(insert);
                    }
                    for(let replacement of result.update.toReplace){
                        await db.collection(collectionName).replaceOne({_id: replacement._id}, replacement);
                    }
                    ret = await db.collection(collectionName).find(query, projection).toArray();
                    resolve(ret);
                }
                else
                {
                    resolve(dbResult)
                }
            }
        })
    });
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
    
        return await db.collection(this.collection).findOne(query, projection).catch(err => console.error(err));
    };

    async find(query, projection) {
        return await getUpdate(query, projection, this.collection, 'find');
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