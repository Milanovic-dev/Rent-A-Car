const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

dotenv.config();

const dbConnect = require('../db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const dbCollection = 'agents'

const subscribeAgent = async (args) => {
    
    let integrationDb = await db.collection(dbCollection).findOne({username: args.username});

    if(integrationDb) return { status: 200 }; 

    let result = await db.collection(dbCollection).insertOne({
        username: args.username,
        cars: args.cars
    })

    if(result.insertedId)
    {   
        return result.insertedId;
    }

};


const synchronize = async(agent) => {
    let integrationDb = await db.collection(dbCollection).findOne({username: agent.username});
    
    if(integrationDb) {
        // TODO: Return database data for given agent
        return syncData(integrationDb);
    }

    return { status: 404 };
};


const syncData = (integrationData) => {
    let data = {};
    data.username = integrationData.username;
    data.cars = integrationData.cars;
    return data;
};

module.exports = {
    subscribeAgent,
    synchronize
}