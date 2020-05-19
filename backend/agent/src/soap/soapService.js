const soap = require('soap');
const fs = require('fs');
const hostUrl = process.env.HOST_URL + '/api/webhook/getWsdl';
const db = require('../../dbSync');
db.connect();

const options = {};

const service = {
    
};

const xml = fs.readFileSync('service.wsdl', 'utf8');

const createService = async (server, callback) => {
    soap.listen(server, '/wsdl', service, xml, callback);
}

const getClient = async () => {
    const client = await soap.createClientAsync(hostUrl, options);
    if(db.getDb()){
        const token = await db.getToken();
        if(token){
            client.addSoapHeader(`<AuthToken>${token}</AuthToken>`);
        }
    }
    return client;
}

module.exports = {
    service,
    options,
    getClient,
    createService
}