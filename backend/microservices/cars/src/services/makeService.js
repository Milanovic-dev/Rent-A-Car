//env
const dotenv = require('dotenv');
dotenv.config();
//database
const dbConnect = require('../../db');
const dbCollection = 'makes';
const ObjectID = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken')


let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const generatePermissionMiddleware = (permission) => {
    return async (req, res, next) => {
        if (typeof req.headers.authorization !== "undefined") {
            let token = req.headers.authorization.split(" ")[1];

            jwt.verify(token, process.env.JWT_SECRET, { algorithm: "HS256" }, (err, user) => {
                res.locals.uid = user.id;
                console.log(err,user);
                if (err) {
                    res.status(401).json({ error: "Not Authorized" });
                    return;
                    //throw new Error("Not Authorized");
                }

                db.collection('users').find({ username: user.id }).toArray((err, result) => {
                    if (err) {
                        res.status(404).json({ error: "Not Found" });
                        return;
                    }

                    if (result && !result.length) {
                        res.status(404).json({ error: "Not Found" });
                        return;
                    }

                    if (result[0].permissions && result[0].permissions.indexOf('*') !== -1) {
                        return next();
                    }

                    if (result[0].permissions && result[0].permissions.indexOf(permission) !== -1) {
                        return next();
                    }

                    res.status(401).json({ error: "Not Authorized" });
                    return;
                });
            });
        } else {
            res.status(401).json({ error: "Not Authorized" });
            return;
            //throw new Error("Not Authorized");
        }
    }

}

const createMake = async (make) => {
    
  if(make == undefined) return { status: 400 }; 

  let result = await db.collection(dbCollection).insertOne(make);
  if(result.insertedId)
  {
      return {
          response: result.insertedId,
          status: 201
      };
  }

  return { status: 500 };
};

const updateMake = async (make) => {

  if(make == undefined) return { status: 400 }; 

  let dbMake = await db.collection(dbCollection).findOne(
      {
          _id: ObjectID(make._id)
      }
  );

  if(!dbMake){
      return { status:404 };
  }

  let result = await db.collection(dbCollection).updateOne(
      {
          _id : ObjectID(make._id)
      },
      {
          $set: {
              name: make.name
          }
      }
  );

  if(result.modifiedCount == 1){
      return { status:200 };
  }

  return { status: 404 };
};

const removeMake = async (id) => {
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


const getMake = async (id) => {
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
  create: createMake,
  update: updateMake,
  remove: removeMake,
  get: getMake,
  getAll,
  generatePermissionMiddleware
};
