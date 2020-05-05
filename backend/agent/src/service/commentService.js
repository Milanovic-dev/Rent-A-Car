const ObjectID = require('mongodb').ObjectID;
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('../../db');
const dbCollection = 'comments';
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
});

const addComment = async (comment,carId) => {
    if(comment == undefined) return { status: 400 };
    if(carId == undefined) return { status: 400 };
    let commentObject = { comment , carId };

    let result = await db.collection(dbCollection).insertOne(commentObject);
    if(result.insertedId)
    {
        return {
            response: result.insertedId,
            status: 201
        };
    }

    return { status: 500 };
};

const getPendingComments = async () => {
  let result = await db.collection(dbCollection).find(
    {
        approved:false
    }
  ).toArray();

  if(result){
      return {
          response: result,
          status: 200
      };
  }

  return { status: 404 };
};

const approveComment = async (id) => {
    let result = await db.collection(dbCollection).updateOne(
      {
        _id: ObjectID(id)
      },
      {
        $set: {
          approved: true
        }
      }
    );
    if(result.modifiedCount == 1){
      return { status:200 };
    }

    return { status: 404 };
};

const rejectComment = async (id) => {
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

const getAllApproved = async () => {
  let result = await db.collection(dbCollection).find(
    {
        approved:true
    }
  ).toArray();
  
  if(result.length <= 0 )
  {
    console.log("No comments to show.");
  }

  return {
      response: result,
      status: 200
  };

};

const addReplay = async (id,comment) => {
	let result = await db.collection(dbCollection).updateOne(
		{
			_id: ObjectID(id),
			approved:false
		},
		{
			$push: {
				replies: comment
			}
		}
	  )

	  if(result.modifiedCount == 1){
		return { status:200 };
	  }
  
	  return { status: 404 };
};

module.exports = {
  add: addComment,
  getPending: getPendingComments,
  approve: approveComment,
  reject: rejectComment,
  getAll: getAllApproved,
  replay: addReplay
};
