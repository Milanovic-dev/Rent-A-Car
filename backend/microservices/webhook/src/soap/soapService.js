const fs = require('fs');
const soap = require('soap');
const jwt = require('jsonwebtoken');

const { subscribeAgent, synchronize, recieveUpdate } = require('../service');

const xml = fs.readFileSync('service.wsdl', 'utf8');

const options = {};

const service = {
    WebhookService:{
        WebhookPort:{
            SubscribeAgent: async (args, cb, soapHeader) => {
                let result = await subscribeAgent(args);
                return result;
            },
            SyncAgent: async (args, cb, soapHeader) => {
                let result = await synchronize(args, soapHeader);
                return result;
            },
            SyncUpdate: async (args, cb, soapHeader) => {
                let result = await recieveUpdate(args, soapHeader);
                console.log(result);
                return result;
            }
        }
    }
}

const createService = async (server, callback) => {
    const soapServer = soap.listen(server, '/wsdl', service, xml, (err, res) => {
        if(err){
            console.error(err);
            return;
        }
        console.log("Soap Service Initialized");
        if(callback){
            callback();
        }
    });
}

const getClient = async (url) => {
    try{
        let client = await soap.createClientAsync(url, options);
        return client;
    }catch(err){
        console.error(`Unable to get client: ${err}`);
    }
}

module.exports = {
    service,
    options,
    getClient,
    createService
}

