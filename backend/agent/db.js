const MongoClient = require('mongodb').MongoClient;
const isDocker = require('is-docker');
const { getClient } = require('./src/soap/soapService');
require('colors');
const { ObjectID } = require('mongodb');
var connection;
// db.createUser( { user: "rootAgent", pwd: "EEskoqhm#~AJdK4iX", roles: [ { role: "readWrite", db: "agent" } ] } )

module.exports = function() {
   username = process.env.DB_USERNAME
   password = process.env.DB_PASSWORD
   server = process.env.DB_SERVER
   dbName = process.env.DB_NAME

   return new Promise((resolve, reject) => {
      if (connection){
         resolve(new dbSyncWrapper(connection))
      }

      const uri = isDocker() ? `mongodb://db/${dbName}` : `mongodb://${username}:${encodeURIComponent(password)}@${server}/${dbName}`;

      MongoClient.connect(uri, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         }, (err, db) => {
         if (err)
         {
            console.log(err);
            reject(err);
         }
      
         connection = db.db(dbName);

         connection.collection('changes')

         resolve(new dbSyncWrapper(connection)) 
      })

   })
}


const insertOp = async (db, collectionName, res, data) => {
   const r = await res;
   data._id = ObjectID(r.insertedId);
   const insert = data

   const changesCollection = await db.collection('changes').findOne({collName: collectionName});

   if(!changesCollection) {
      await db.collection('changes').insertOne({collName: collectionName, toInsert:[], toUpdate:[], toRemove:[]});
   }

   await db.collection('changes').updateOne({collName: collectionName}, {$push: {toInsert: insert}});
}

const updateOp = async (db, collectionName, filter, update) => {
   const res = await db.collection(collectionName).findOne(filter);
   
   const changesCollection = await db.collection('changes').findOne({collName: collectionName});

   if(!changesCollection) {
      await db.collection('changes').insertOne({collName: collectionName, toInsert:[], toUpdate:[], toRemove:[]});
   }

   if(res){
      const data = {filter, update: update.$set}
      await db.collection('changes').updateOne({collName:collectionName}, {$push: {toUpdate: data}});
   }
}

const removeOp = async (db, collectionName, query) => {
   const res = await db.collection(collectionName).find(query).toArray();
   
   const changesCollection = await db.collection('changes').findOne({collName: collectionName});

   if(!changesCollection) {
      await db.collection('changes').insertOne({collName: collectionName, toInsert:[], toUpdate:[], toRemove:[]});
   }

   for(let i = 0 ; i < res.length ; i++){
      await db.collection('changes').updateOne({collName:collectionName}, {$push:{toRemove: query}});
   }
}

const watchman = {
   insertOp,
   updateOp,
   removeOp
}

class dbSyncWrapper {
   constructor(conn){
      this.db = conn;
   }

   collection(name){
      return new dbSyncFunctions(this, this.db, name);
   }

   async dropDatabase(){
      this.db.dropDatabase();
   }

   async saveToken(token){
      await this.db.collection('user').updateOne({id: 'agentUser'}, {$set: {accessToken: token}}, {upsert: true});
  };
  
   async getToken(){
      let result = await this.db.collection('user').findOne({id: 'agentUser'});
      return result.accessToken;
  };

  async sync(){
   const timestamp = Date.now();
   const soapClient = await getClient();
   const accessToken = await this.getToken();

   const diffData = await this.db.collection('changes').find().toArray();   
   const requestBody = JSON.stringify({data:diffData, auth:{token: accessToken}});

   soapClient.Synchronize(requestBody, async (err, res) => {
      if(err){
         console.error(err.Fault);
         console.log(`Sync: `.yellow + ` failed (SoapError)`.red);
      }
     
      let responseBody;
      try{
         responseBody = JSON.parse(res);
      }
      catch(err){
         console.log(`Sync: `.yellow + ` failed (Can't parse response)`.red);
         return;
      }
     
      if(!responseBody){
         return;
      }
     
      if(responseBody.status/100 !== 2){
         console.log(`Sync: `.yellow + ` failed (Status: ${responseBody.status} Reason: ${responseBody.reason})`.red);
         return;
      }

      let endTimestamp;
      if(responseBody){
         for(let i = 0 ; i < responseBody.updates.length ; i++){
            const collName = responseBody.updates[i].collName;
            for(let j = 0 ; j < responseBody.updates[i].toInsert.length ; j++){
               responseBody.updates[i].toInsert[j]._id = ObjectID(responseBody.updates[i].toInsert[j]._id);
               this.db.collection(collName).insertOne(responseBody.updates[i].toInsert[j]);
            }
            for(let j = 0 ; j < responseBody.updates[i].toUpdate.length ; j++){
               if(responseBody.updates[i].toUpdate[j].filter) {
                  if(responseBody.updates[i].toUpdate[j].filter._id){
                     responseBody.updates[i].toUpdate[j].filter._id = ObjectID(responseBody.updates[i].toUpdate[j].filter._id);
                  }
               }
               await this.db.collection(collName).updateMany(responseBody.updates[i].toUpdate[j].filter, {$set:responseBody.updates[i].toUpdate[j].update});
            }
            for(let j = 0 ; j < responseBody.updates[i].toRemove.length; j++){
               if(responseBody.updates[i].toRemove[j]._id){
                  responseBody.updates[i].toRemove[j]._id = ObjectID(responseBody.updates[i].toRemove[j]._id);
               }
               await this.db.collection(collName).deleteMany(responseBody.updates[i].toRemove[j]);
            }
         }
      }
      
      try{
         await this.db.collection('changes').drop()
      } catch (err){
      }
      
      endTimestamp = Date.now();
      console.log(`Sync:` .yellow + ` done(${endTimestamp-timestamp}ms)`.green);    
   })
   }
  
}

class dbSyncFunctions {
   constructor(dbWrapper, db, collection) {
      this.wrapper = dbWrapper;
      this.db = db;
      this.collection = collection;
   }

   find(query, projection) {
      return this.db.collection(this.collection).find(query, projection);
   }

   findOne(query, projection) {
      return this.db.collection(this.collection).findOne(query, projection);
   }

   async insertOne(data, options){
      const res = this.db.collection(this.collection).insertOne(data, options);
      await watchman.insertOp(this.db, this.collection, res, data)
      return res;
   }

   async updateOne(filter, data, options){
      const res = this.db.collection(this.collection).updateOne(filter, data, options);
      await watchman.updateOp(this.db, this.collection, filter, data);
      return res;
   }

   async updateMany(filter, data, options){
      const res = this.db.collection(this.collection).updateMany(filter, data, options);
      await watchman.updateOp(this.db, this.collection, filter, data);
      return res;
   }

   async deleteOne(filter, options){
      await watchman.removeOp(this.db, this.collection, filter);
      const res = this.db.collection(this.collection).deleteOne(filter, options);
      return res;
   }

   async deleteMany(filter, options){
      await watchman.removeOp(this.db, this.collection, filter);
      const res = this.db.collection(this.collection).deleteMany(filter, options);
      return res;
   }
}
