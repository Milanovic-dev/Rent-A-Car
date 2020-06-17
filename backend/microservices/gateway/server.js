const path = require('path');
const gateway = require('express-gateway');

gateway()
  .load(path.join(__dirname, 'config'))
  .run();

const dbConnect = require('./db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then(async (conn) => {
    db = conn;
    await db.dropDatabase();
}).catch((e) => {
    console.log(`DB error: ${e}`);
})