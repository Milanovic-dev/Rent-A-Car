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