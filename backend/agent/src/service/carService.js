const ObjectID = require('mongodb').ObjectID;
const db = require('../../dbSync');
const dbCollection = 'cars';
db.connect();

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
}

const getAll = async () => {
    let result = await db.collection(dbCollection).find().toArray();

    return {
        response: result,
        status: 200
    };
};
const rentedCar = async (data) => {
    console.log(data);
    if(data == undefined) return { status: 400 };

    // let car = await db.collection('cars').find({ _id: ObjectID(data.carId)}).toArray();
    // let newMileage = Number(car[0].mileage) + Number(data.mileage);

    // await db.collection('cars').updateOne({ _id : ObjectID(car[0]._id)},{
    //         $set: {
    //             mileage: newMileage
    //         }
    //     }
    // );

    // let limit = 20; // limit koliko kilometara smije preci
    // if(data.mileage > limit){
    //     await db.collection('users').updateOne({ _id : ObjectID(data.userId)},{
    //         $set: {
    //             debt: "20" //neka vrijednost za dug
    //         }
    //     }
    // );
    // }

    let result = await db.collection('mileageReport').insertOne(data);
    if(result.insertedId)
    {
        return {
            response: result.insertedId,
            status: 201
        };
    }

    return { status: 500 };

};
const carStats = async () => {
    let cars = await db.collection('cars').find({}).toArray();
    let comments = await db.collection('comments').find({}).toArray();
    let result = [];
  
    let maxMileage = cars[0];
    let maxComments = cars[0]; //potrebno je prebrojati komentare za sva auta i pronaci ono sa najvise njih
    let maxRating = cars[0];
    for(let i=1; i < cars.length; i++){
        if(Number(cars[i].mileage) > Number(maxMileage.mileage)){
            maxMileage = cars[i];
        }
        if(Number(cars[i].rating) > Number(maxRating.rating)){
            maxRating = cars[i];
        }
    }

    result[0] = maxMileage;
    result[1] = maxComments;
    result[2] = maxRating;

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
    rented: rentedCar,
    stats: carStats,
    getAll
};
