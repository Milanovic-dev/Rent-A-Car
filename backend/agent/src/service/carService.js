const ObjectID = require('mongodb').ObjectID;
const dbCollection = 'cars';
const dbConnect = require('../../db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
    .then((conn) => {
        db = conn;
    }).catch((e) => {
        console.log(`DB error: ${e}`);
    })

const createCar = async (car) => {

    if (car == undefined) return { status: 400 };

    let result = await db.collection(dbCollection).insertOne(car);
    if (result.insertedId) {
        return {
            response: result.insertedId,
            status: 201
        };
    }

    return { status: 500 };
};

const updateCar = async (car) => {

    if (car == undefined) return { status: 400 };

    let dbCar = await db.collection(dbCollection).findOne(
        {
            _id: ObjectID(car._id)
        }
    );

    if (!dbCar) {
        return { status: 404 };
    }

    let result = await db.collection(dbCollection).updateOne(
        {
            _id: ObjectID(car._id)
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
                limitMileage: car.limitMileage ? car.limitMileage : dbCar.limitMileage,
                cdw: car.cdw ? car.cdw : dbCar.cdw,
                seatCount: car.seatCount ? car.seatCount : dbCar.seatCount,
                productionYear: car.productionYear ? car.productionYear : dbCar.productionYear,
                color: car.color ? car.color : dbCar.color,
                image: car.image ? car.image : dbCar.image,
                price: car.price ? car.price : dbCar.price,
                power: car.power ? car.power : dbCar.power,
                description: car.description ? car.description : dbCar.description,


            }
        }
    );

    if (result.modifiedCount == 1) {
        return { status: 200 };
    }

    return { status: 404 };
};

const removeCar = async (id) => {
    let result = await db.collection(dbCollection).deleteOne(
        {
            _id: ObjectID(id)
        }
    );

    if (result.deletedCount == 1) {
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

    if (result) {
        return {
            response: result,
            status: 200
        };
    }

    return { status: 404 };
}

const getAll = async () => {
    let result = await db.collection(dbCollection).find({}).toArray();
    return {
        response: result,
        status: 200
    };
};
const completedRentals = async () => {
    let result = [];
    // result = await db.collection('orders').find({finished: true}).toArray();
    return {
        response: result,
        status: 200
    };
};
const milReport = async (id) => {
    let result = [];
    // result = await db.collection('orders').find({_id : id}).toArray();
    return {
        response: result[0],
        status: 200
    };
};


const mileageReport = async (data,id) => {
    console.log(data);
    if (data == undefined) return { status: 400 };
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
    let order = await db.collection('orders').find({_id : id}).toArray();
    order[0].mileageReport = data;

    return {
        response: order[0]._id,
        status: 200
    };

    // let result = await db.collection('mileageReport').insertOne(data);
    // if (result.insertedId) {
    //     return {
    //         response: result.insertedId,
    //         status: 201
    //     };
    // }

    // return { status: 500 };

};
const carStats = async (sort) => {
    let cars = await db.collection(dbCollection).find().toArray();
    let comments = await db.collection('reviews').find().toArray();
    for (let i = 0; i < cars.length; i++) {
        for (let j = 0; j < comments.length; j++) {
            if (cars[i]._id == comments[j].carId) {
                cars[i].comments.push(comments[j]);
            }
        }
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].totalComments = cars[i].comments.length;
        let sum = 0;
        for (let j = 0; j < cars[i].comments.length; j++) {
            sum += Number(cars[i].comments[j].rate);
        }
        cars[i].avgRate = sum / cars[i].totalComments;
    }

    let result = [];
    // if(sort == 0){
    //     result = cars.sort({ mileage : -1 });
    // } else if (sort == 1){
    //     result = cars.sort({ totalComments : -1 });
    // }else if (sort == 2){
    //     result = cars.sort({ avgRate : -1 });
    // }


  
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
    stats: carStats,
    report: milReport,
    mileageReport,
    completedRentals,
    getAll
};
