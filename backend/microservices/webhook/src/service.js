const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ObjectID = require('mongodb').ObjectID;

const dbConnect = require('../db');
let db;
dbConnect(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_SERVER, process.env.DB_NAME)
.then((conn) => {
    db = conn;
}).catch((e) => {
    console.log(`DB error: ${e}`);
})

const subscribeAgent = async (args) => {
    
    const agentCollection = await db.collection('agents').findOne({username: args.username});

    if(agentCollection){
        if(bcrypt.compareSync(args.password, agentCollection.password)){
            const accessToken = jwt.sign({"id": agentCollection._id}, process.env.JWT_AGENT_SECRET, { algorithm: 'HS256' });
            return {
                accessToken,
                status: 200
            };
        }
    }

    return {
        status: 401
    };
};


const synchronize = async(agent, soapHeader) => {
    const token = soapHeader.AuthToken;

    const result = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_AGENT_SECRET, (err, tokenData) => {
            if(err){
                console.error(err);
                reject('401');
            }
            const id = tokenData;
            resolve(id);
        });
    });

    if(result == '401') return result;

    const id = result.id;

    let agentCollection = await db.collection('agents').findOne({_id: ObjectID(id)});

    if(!agentCollection) return '404';

    const collectionName = agentCollection.username;
    console.log(`${collectionName} Synced`);

    // TODO: Sync

    return '200';
};


module.exports = {
    subscribeAgent,
    synchronize
}