//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../../db');
const dbCollection = 'cars';
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const createCar = async (car) => {
    
  if(car == undefined) return { status: 400 }; 

  let result = await db.collection(dbCollection).insertOne(car);
  if(result.insertedId)
  {
      return {
          response: result.insertedId,
          status: 201
      };
  }

  return { status: 500 };
};

const updateCar = async (car) => {

  if(car == undefined) return { status: 400 }; 

  let dbCar = await db.collection(dbCollection).findOne(
      {
          _id: ObjectID(car._id)
      }
  );

  if(!dbCar){
      return { status:404 };
  }

  let result = await db.collection(dbCollection).updateOne(
      {
          _id : ObjectID(car._id)
      },
      {
          $set: {
              location: car.location ? car.location : dbCar.location,
              make: car.make ? car.make : dbCar.make,
              model: car.model ? car.model : dbCar.model,
              fuel: car.fuel ? car.fuel : dbCar.fuel,
              transmission: car.transmission ? car.transmission : dbCar.transmission,
              class: car.class ? car.class : dbCar.class,
              mileage: car.mileage ? car.mileage : dbCar.mileage,
              cdw: car.cdw ? car.cdw : dbCar.cdw,
              seatCount: car.seatCount ? car.seatCount : dbCar.seatCount
          }
      }
  );

  if(result.modifiedCount == 1){
      return { status:200 };
  }

  return { status: 404 };
};

const removeCar = async (id) => {
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


const getCar = async (id) => {
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
  create: createCar,
  update: updateCar,
  remove: removeCar,
  get: getCar,
  getAll
};
