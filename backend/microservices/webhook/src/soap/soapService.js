const fs = require('fs');
const soap = require('soap');

const { subscribeAgent, synchronize } = require('../service');

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
                let result = await synchronize(args);
                return result;
            }
        }
    }
}

const createService = async (server, callback) => {
    soap.listen(server, '/wsdl', service, xml, (err, res) => {
        if(err){
            console.error(err);
        }
        console.log("Soap Service Initialized");
        if(callback){
            callback();
        }
    });
}

const getClient = async (url) => {
    let ret;
    let client = await soap.createClientAsync(url, options);
    return client;
}

module.exports = {
    service,
    options,
    getClient,
    createService
}