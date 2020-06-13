const MongoClient = require('mongodb').MongoClient;
const isDocker = require('is-docker');
let connection;

module.exports = function(username, password, server, dbName) {
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

class dbSync{
   constructor(db){
      this.db = db;
   }

   collection(collectionName){
      return new dbSyncFunctions(collectionName, this.db);
   }

   async dropDatabase(){
      return await this.db.dropDatabase();
   }

   getDb(){
      return this.db;
     }
}


class dbSyncFunctions {
   constructor(collection, db) {
      this.collection = collection;
      this.db = db;
   }

   async find(query, projection) {
      if(!query) query = {}

      query.removed = false;
      return await this.db.collection(this.collection).find(query, projection).toArray();
  };

  async findOne(query, projection) {
      if(!query) query = {}

      query.removed = false;
      const res = await db.collection(this.collection).find(query, projection).toArray();
      return res[0];
  }

  async insertOne(data, options) {
      data.version = 0;
      data.removed = false;
      const res = await this.db.collection(this.collection).insertOne(data, options);
      return res;
  }
  
  async updateOne(filter, update, options) {
      update.$inc = {version: 1};
      return await this.db.collection(this.collection).updateOne(filter, update, options);
  }

  async removeOne(filter, options) {
      return await this.db.collection(this.collection).updateOne(filter, {$inc: {version: 1}, $set:{removed: true}}, options);
  };
   
  async drop(){
     return await this.db.collection(this.collection).drop();
  }

}