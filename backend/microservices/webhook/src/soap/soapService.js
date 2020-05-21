const fs = require('fs');
const soap = require('soap');
const jwt = require('jsonwebtoken');
const colors = require('colors');
const { subscribeAgent, synchronize, sendRequest, getUpdate } = require('../service');

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
            SendRequest: async (args, cb, soapHeader) => {
                let result = await sendRequest(args, soapHeader);
                return result;
            },
            GetUpdate: async(args, cb, soapHeader) => {
                let result = await getUpdate(args, soapHeader);
                return JSON.stringify(result);
            }
        }
    }
};

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
};

const getClient = async () => {
    let client = await soap.createClientAsync(url, options);
    return client;
};

module.exports = {
    service,
    options,
    getClient,
    createService
}

