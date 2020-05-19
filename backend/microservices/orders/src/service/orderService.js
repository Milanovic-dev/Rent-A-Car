//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../../db');
const dbCollection = 'orders';
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const createOrder = async (order) => {
    
  if(order == undefined) return { status: 400 }; 

  let result = await db.collection(dbCollection).insertOne(order);
  if(result.insertedId)
  {
      return {
          response: result.insertedId,
          status: 201
      };
  }

  return { status: 500 };
};

const removeOrder = async (id) => {
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

const getOrder = async (id) => {
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
}

const getAll = async () => {
  let result = await db.collection(dbCollection).find().toArray();

  return {
      response: result,
      status: 200
  };
};

const approveOrder = async (id, approved) => {

    if(id == undefined) return { status: 400 }; 
  
    let dbOrder = await db.collection(dbCollection).findOne(
        {
            _id: ObjectID(id)
        }
    );
  
    if(!dbOrder){
        return { status:404 };
    }
  
    let result = await db.collection(dbCollection).updateOne(
        {
            _id : ObjectID(id)
        },
        {
            $set: {
                approved: approved
            }
        }
    );
  
    if(result.modifiedCount == 1){
        return { status:200 };
    }
  
    return { status: 404 };
  };


module.exports = {
  create: createOrder,
  remove: removeOrder,
  approve: approveOrder,
  get: getOrder,
  getAll
};
