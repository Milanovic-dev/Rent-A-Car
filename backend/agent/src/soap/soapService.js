const soap = require('soap');
const fs = require('fs');
const request = require('request');
const hostUrl = process.env.HOST_URL + '/webhook/getWsdl';
const db = require('../../dbSync');
db.connect();

const specialRequest = request.defaults({
    agentOptions: {
        ca: fs.readFileSync('./src/security/certificates/chain.pem')
    },
    strictSSL: false
})

const options = {
    request: specialRequest
};

const service = {
    
};

const xml = fs.readFileSync('service.wsdl', 'utf8');

const createService = async (server, callback) => {
    soap.listen(server, '/wsdl', service, xml, callback);
}

const getClient = async () => {
    return new Promise((resolve, reject) => {
        soap.createClient(hostUrl, options, async (err, client) => {
            if(err){
                console.error(err);
                reject(err);
            }

            if(db.getDb()){
                const token = await db.getToken();
                if(token){
                    client.addSoapHeader(`<AuthToken>${token}</AuthToken>`);
                }
            }
            resolve(client);
        });
    })
}

module.exports = {
    service,
    options,
    getClient,
    createService
}