const soap = require('soap');
const fs = require('fs');
const options = {};

const service = {
    
};

const xml = fs.readFileSync('service.wsdl', 'utf8');

const createService = async (server, callback) => {
    soap.listen(server, '/wsdl', service, xml, callback);
}

const getClient = async (url) => {
    let client = await soap.createClientAsync(url, options);
    return client;
}

module.exports = {
    service,
    options,
    getClient,
    createService
}