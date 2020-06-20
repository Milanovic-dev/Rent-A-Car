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
        db.sync();
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
        db.sync();
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
        db.sync();
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

const completedRental = async (id) => {

    let bundles = await db.collection('bundles').find({ _id: ObjectID(id) }).toArray();
    let orders = await db.collection('orders').find({ _id: ObjectID(id) }).toArray();
    let result = {};
    if (orders[0]) {
        result = orders[0];
        car = await db.collection('cars').find({ _id: ObjectID(result.carId) }).toArray();
        result.car = car[0];
        result.totalCars = '1';
    } else if (bundles[0]) {
        result = bundles[0];
        let car = {};
        for (let i = 0; i < result.cars.length; i++) {
            car = await db.collection('cars').find({ _id: ObjectID(result.cars[i]) }).toArray();
            result.cars[i] = car[0];
        }

        result.totalCars = String(result.cars.length);
        console.log(result);
    }
    return {
        response: result,
        status: 200
    };
};

const completedRentals = async () => {
    await db.collection('orders').insertOne({
         'cars': [
                        {
                            'make': 'audi',
                            'model': 'a6',
                            'productionYear': '2015',
                            'dateStart': '15.06.2020',
                            'dateEnd': '20.06.2020',
                            'rentedCar': 'audi a6 2015'
                        },
                        {
                            'make': 'bmw',
                            'model': 'x3',
                            'productionYear': '2015',
                            'dateStart': '15.06.2020',
                            'dateEnd': '20.06.2020',
                            'rentedCar': 'bmw x3 2015'
                        },
                        {
                            'make': 'golf',
                            'model': 'mk7',
                            'productionYear': '2015',
                            'dateStart': '15.06.2020',
                            'dateEnd': '20.06.2020',
                            'rentedCar': 'audi a6 2015'
                        }
                    ],
                    'status': 'PENDING',
                    'totalCars': '3',
                    'finished': true
        });
        await db.collection('orders').insertOne({
            'cars': [
                           {
                               'make': 'audi',
                               'model': 'a6',
                               'productionYear': '2015',
                               'dateStart': '15.06.2020',
                               'dateEnd': '20.06.2020',
                               'rentedCar': 'audi a6 2015'
                           },
                           
                       ],
                       'status': 'PENDING',
                       'totalCars': '1',
                       'finished': true
           });

const completedRentalsBundles = async () => {
    let result = [];
    result = await db.collection('bundles').find({ status: "FINISHED" }).toArray();
    let car = {};
    for (let i = 0; i < result.length; i++) {
        // car[i] = await db.collection('cars').find({ _id: ObjectID(result[i].carId) }).toArray();
        // result[i].car = car[i];
        result[i].totalCars = String(result[i].cars.length);
    }
    return {
        response: result,
        status: 200
    };
};
const completedRentals = async () => {
    let result = [];
    result = await db.collection('orders').find({ status: "FINISHED" }).toArray();
    let car = {};
    for (let i = 0; i < result.length; i++) {
        car[i] = await db.collection('cars').find({ _id: ObjectID(result[i].carId) }).toArray();
        result[i].car = car[i];
        result[i].totalCars = '1';
    }
    return {
        response: result,
        status: 200
    };
};
const milReport = async (id, carId) => {
    let mileageReport = await db.collection('mileageReports').find({$and : [{ orderId: id }, { carId: carId }]}).toArray();
    if (mileageReport[0]) {
        let bundles = await db.collection('bundles').find({ _id: ObjectID(id) }).toArray();
        let order = await db.collection('orders').find({ _id: ObjectID(id) }).toArray();
        if (order[0]) {
            let result = order[0];
            let car = await db.collection('cars').find({ _id: ObjectID(result.carId) }).toArray();
            result.car = car[0];
            result.rentedCar = result.car.make + " " + result.car.model + " " + result.car.productionYear;
            result.newMileage = mileageReport[0].newMileage;
            result.additionalInfo = mileageReport[0].additionalInfo;
            return {
                response: result,
                status: 200
            };
        }
        else {
            let result = bundles[0];
            let car = await db.collection('cars').find({ _id: ObjectID(carId) }).toArray();
            result.car = car[0];
            result.rentedCar = result.car.make + " " + result.car.model + " " + result.car.productionYear;
            result.newMileage = mileageReport[0].newMileage;
            result.additionalInfo = mileageReport[0].additionalInfo;
            return {
                response: result,
                status: 200
            };
        }

    } else {
        let bundles = await db.collection('bundles').find({ _id: ObjectID(id) }).toArray();
        let order = await db.collection('orders').find({ _id: ObjectID(id) }).toArray();
        if (order[0]) {
            let result = order[0];
            let car = await db.collection('cars').find({ _id: ObjectID(result.carId) }).toArray();
            result.car = car[0];
            result.rentedCar = result.car.make + " " + result.car.model + " " + result.car.productionYear;
            return {
                response: result,
                status: 200
            };
        }else{
            let result = bundles[0];
            let car = await db.collection('cars').find({ _id: ObjectID(carId) }).toArray();
            result.car = car[0];
            result.rentedCar = result.car.make + " " + result.car.model + " " + result.car.productionYear;
            return {
                response: result,
                status: 200
            };
        }
    }


};


const mileageReport = async (data, id, carId) => {
    let mileageReport = await db.collection('mileageReports').find({$and : [{ orderId: id }, { carId: carId }]}).toArray();
    if (mileageReport[0]) {
        console.log(data);
        if (data == undefined) return { status: 400 };
        let newMileage = Number(data.car.mileage) - Number(mileageReport[0].newMileage) + Number(data.newMileage);
        await db.collection(dbCollection).updateOne({ _id: ObjectID(data.car._id) }, {
            $set: {
                mileage: String(newMileage)
            }
        }
        );
        // if(data.newMileage > data.limitMileage){
        //     await db.collection('users').updateOne({ _id : ObjectID(data.userId)},{
        //         $set: {
        //             debt: "20" //neka vrijednost za dug
        //         }
        //     }
        // );
        // }


        let result = await db.collection('mileageReports').updateOne({ _id: ObjectID(mileageReport[0]._id) }, {
            $set: {
                newMileage: data.newMileage,
                additionalInfo: data.additionalInfo
            }
        }
        );
        if (result.modifiedCount == 1) {
            db.sync();
            return { status: 200 };
        }

        return { status: 404 };

    } else {

        console.log(data);
        if (data == undefined) return { status: 400 };
        let newMileage = Number(data.car.mileage) + Number(data.newMileage);
        await db.collection(dbCollection).updateOne({ _id: ObjectID(data.car._id) }, {
            $set: {
                mileage: String(newMileage)
            }
        }
        );
        // if(data.newMileage > data.limitMileage){
        //     await db.collection('users').updateOne({ _id : ObjectID(data.userId)},{
        //         $set: {
        //             debt: "20" //neka vrijednost za dug
        //         }
        //     }
        // );
        // }

        let obj = {};
        obj.newMileage = data.newMileage;
        obj.additionalInfo = data.additionalInfo;
        obj.orderId = data._id;
        obj.carId = data.car._id;
        console.log(obj);

        let result = await db.collection('mileageReports').insertOne(obj);
        if (result.insertedId) {
            db.sync();
            return {
                response: result.insertedId,
                status: 201
            };
        }

        return { status: 500 };

    }

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
        if (cars[i].comments) {
            cars[i].totalComments = cars[i].comments.length;
            let sum = 0;
            for (let j = 0; j < cars[i].comments.length; j++) {
                sum += Number(cars[i].comments[j].rate);
            }
            cars[i].avgRate = sum / cars[i].totalComments;
        }
    }

    let result = [];

    if (sort == 0) {
        result = cars.sort((a, b) => a.mileage > b.mileage ? -1 : 1);
    } else if (sort == 1) {
        result = cars.sort((a, b) => a.totalComments > b.totalComments ? -1 : 1);
    } else if (sort == 2) {
        result = cars.sort((a, b) => a.avgRate > b.avgRate ? -1 : 1);
    }



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
    completedRentalsBundles,
    completedRental,
    getAll
};
