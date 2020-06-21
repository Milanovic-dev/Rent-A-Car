const MongoClient = require('mongodb').MongoClient;
const isDocker = require('is-docker');
const { ObjectID } = require('mongodb');
let connection;

const ignore = ['agents', 'fuels', 'makes', 'models', 'pricelist'];

module.exports = function(username, password, server, dbName) {
   return new Promise((resolve, reject) => {
      if (connection)
         resolve(new dbSync(connection))

      const uri = isDocker() ? `mongodb://db/${dbName}` : `mongodb://${username}:${encodeURIComponent(password)}@${server}/${dbName}`;

      MongoClient.connect(uri, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         }, (err, db) => {
         if (err)
            reject(err)
      
         connection = db.db(dbName);
         resolve(new dbSync(connection)) 
      })
   })
}

class dbSync{
   constructor(db){
      this.db = db;
   }

   collection(collectionName){
      return new dbSyncFunctions(this.db, collectionName);
   }

   async dropDatabase(){
      return await this.db.dropDatabase();
   }

   getDirectDb(){
      return this.db;
   }
}

const insertOp = async (db, ownerId, collectionName, res, data) => {
   if(ignoreOp(collectionName)) return;

   const r = await res;
   data._id = ObjectID(r.insertedId);

   const changesCollection = await db.collection('changes').findOne({ownerId: ownerId, collName: collectionName});

   if(!changesCollection) {
      await db.collection('changes').insertOne({ownerId: ownerId, collName: collectionName, toInsert:[], toUpdate:[], toRemove:[]});
   }

   await db.collection('changes').updateOne({ownerId: ownerId, collName: collectionName}, {$push: {toInsert: data}});
}

const updateOp = async (db, collectionName, filter, update) => {
   if(ignoreOp(collectionName)) return;

   const res = await db.collection(collectionName).findOne(filter);

   if(!res) {
      return;
   }

   const ownerId = res.ownerId;
   const changesCollection = await db.collection('changes').findOne({ownerId:ownerId, collName: collectionName});

   if(!changesCollection) {
      await db.collection('changes').insertOne({ownerId: ownerId, collName: collectionName, toInsert:[], toUpdate:[], toRemove:[]});
   }

   if(res){
      const data = {filter: filter, update: update.$set}
      await db.collection('changes').updateOne({ownerId:ownerId, collName:collectionName}, {$push: {toUpdate: data}});
   }

}

const removeOp = async (db, collectionName, query) => {
   if(ignoreOp(collectionName)) return;

   const res = await db.collection(collectionName).findOne(query)

   if(res.length == 0){
      return;
   }
   const ownerId = res.ownerId
   const changesCollection = await db.collection('changes').findOne({collName: collectionName});

   
   if(!changesCollection) {
      await db.collection('changes').insertOne({ownerId: ownerId, collName: collectionName, toInsert:[], toUpdate:[], toRemove:[]});
   }

   await db.collection('changes').updateOne({ownerId: ownerId, collName:collectionName}, {$push:{toRemove: query}});
}

const ignoreOp = (collectionName) => {
   return ignore.includes(collectionName);
}

const watchman = {
   insertOp,
   updateOp,
   removeOp
}


class dbSyncFunctions {
   constructor(db, collection) {
      this.collection = collection;
      this.db = db;
   }

   find(query, projection) {
      return this.db.collection(this.collection).find(query, projection);
   };

   findOne(query, projection) {
      return this.db.collection(this.collection).findOne(query, projection);
   }   

   async insertOne(data, options) {
      const res = this.db.collection(this.collection).insertOne(data, options);
      if(data.ownerId){
         await watchman.insertOp(this.db, data.ownerId, this.collection, res, data);
      }
      return res;
   }

   async updateOne(filter, update, options) {
      const res = this.db.collection(this.collection).updateOne(filter, update, options);
      await watchman.updateOp(this.db, this.collection, filter, update);
      return res;
   }

   async deleteOne(filter, options) {
      await watchman.removeOp(this.db, this.collection, filter);
      const res = this.db.collection(this.collection).deleteOne(filter, options);
      return res;
   };

   drop(){
     return this.db.collection(this.collection).drop();
   }

}