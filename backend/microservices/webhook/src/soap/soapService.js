const fs = require('fs');
const soap = require('soap');
const jwt = require('jsonwebtoken');
const colors = require('colors');
const { subscribeAgent, sync } = require('../service');
const { generateWSDL } = require('./wsdlGenerator');

const xml = fs.readFileSync('service.wsdl', 'utf8');

const options = {};

const service = {
    WebhookService:{
        WebhookPort:{
            SubscribeAgent: async (args, cb, soapHeader) => {
                let result = await subscribeAgent(args);
                return result;
            },
            Synchronize: async (args, cb, soapHeader) => {
                let result = await sync(args);
                return result;
            }
        }
    }
};



const createService = async (server, callback) => {
    generateWSDL(service);
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

