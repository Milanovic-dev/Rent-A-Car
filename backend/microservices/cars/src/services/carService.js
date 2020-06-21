//env
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../../db');
// const { default: carStats } = require('../../../../../frontend/agent-admin/src/views/admin/carStats');
const ObjectID = require('mongodb').ObjectID;
const dbCollection = 'cars';
const uuidv4 = require('uuid/v4');
const { response } = require('express');

let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const upload = (file, res) => {
        

    let fname = uuidv4();
    let extension = '.'  + file.name.split('.').pop();

    if (extension.indexOf('svg') != -1) {
        extension = '.svg';
    }

    //let base64Image = base64.split(';base64,').pop();
    let filename = fname + extension;

    file.mv('./uploads/' + filename, (err) => {
        if (err){
            res.status(500).send('Error');
        }

        res.status(200).send({file:'https://localhost:8080/cars/uploads/' + filename});


    })
}


const createCar = async (car, authorization) => {
    
  if(car == undefined) return { status: 400 }; 

  if(!car.ownerId){
      if(!authorization) return {status: 401};
      const id = await verifyToken(authorization.split(' ')[1]);
      car.ownerId = id;
      let result = await db.collection(dbCollection).find({ownerId: id}).toArray();
      console.log(result.length);
      if(result.length >= 3)
      {
          return { status: 405 };
      }
  }

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
              seatCount: car.seatCount ? car.seatCount : dbCar.seatCount,
              description: car.description ? car.description : dbCar.description
          }
      }
  );

  if(result.modifiedCount == 1){
      return { status:200 };
  }

  return { status: 404 };
};
const busyCar = async (car) => {

    if(car == undefined) return { status: 400 }; 
  
    let dbCar = await db.collection(dbCollection).findOne(
        {
            _id: ObjectID(car.id)
        }
    );
  
    if(!dbCar){
        return { status:404 };
    }
  
    let result = await db.collection(dbCollection).updateOne(
        {
            _id : ObjectID(car.id)
        },
        {
            $set: {
                busyFrom: car.busyFrom,
                busyTo: car.busyTo                
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

const getAll = async (authorization) => {

    let result = await db.collection(dbCollection).find().toArray();
    
    if(authorization) {
        const id = await verifyToken(authorization.split(' ')[1]);

        for(let car of result) {
            if(car.ownerId == id){
                car.userCar = true;
            }
        }
    }


  return {
      response: result,
      status: 200
  };
};

const carStats = async () => {
    result = [{'name':'Aleksandar'}];

    return {
        response: result,
        status: 200
    };
};

const verifyToken = async (token) => {

    if(!token) return '400';

    const result = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, tokenData) => {
            if(err){
                console.error(err);
                reject('401');
            }
            const username = tokenData;
            resolve(username.id);
        });
    });
    return result;
}

module.exports = {
  create: createCar,
  busy: busyCar,
  update: updateCar,
  remove: removeCar,
  get: getCar,
  stats: carStats,
  getAll,
  upload
};
