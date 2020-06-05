//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../../db');
const dbCollection = 'models';
const ObjectID = require('mongodb').ObjectID;

let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const createModel = async (model) => {
    
  if(model == undefined) return { status: 400 }; 

  let result = await db.collection(dbCollection).insertOne(model);
  if(result.insertedId)
  {
      return {
          response: result.insertedId,
          status: 201
      };
  }

  return { status: 500 };
};

const updateModel = async (model) => {

  if(model == undefined) return { status: 400 }; 

  let dbModel = await db.collection(dbCollection).findOne(
      {
          _id: ObjectID(model._id)
      }
  );

  if(!dbModel){
      return { status:404 };
  }

  let result = await db.collection(dbCollection).updateOne(
      {
          _id : ObjectID(model._id)
      },
      {
          $set: {
              name: model.name
          }
      }
  );

  if(result.modifiedCount == 1){
      return { status:200 };
  }

  return { status: 404 };
};

const removeModel = async (id) => {
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


const getModel = async (id) => {
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

module.exports = {
  create: createModel,
  update: updateModel,
  remove: removeModel,
  get: getModel,
  getAll
};
