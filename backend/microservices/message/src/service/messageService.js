//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../../db');
const dbCollection = 'messages';
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const createMessage = async (message) => {
    
    if(message == undefined) return { status: 400 }; 
  
    let result = await db.collection(dbCollection).insertOne(message);
    if(result.insertedId)
    {
        return {
            response: result.insertedId,
            status: 201
        };
    }
  
    return { status: 500 };
  };

  const getMessage = async (id) => {
    let result = await db.collection(dbCollection).findOne(
        {
            _id: ObjectID(id)
        }
    );
  
    if(result){
        return {
            response: result,
            status: 200
        };
    }
  
    return { status: 404 };
  };

  const getAll = async () => {
    let result = await db.collection(dbCollection).find().toArray();
  
    return {
        response: result,
        status: 200
    };
  };

  const removeMessage = async (id) => {
    let result = await db.collection(dbCollection).deleteOne(
        {
            _id: ObjectID(id)
        }
    );
  
    if(result.deletedCount == 1){
        return { status: 200 };
    }
  
    return { status: 404 };
  };
  
module.exports = {
    create: createMessage,
    remove: removeMessage,
    get: getMessage,
    getAll
};
