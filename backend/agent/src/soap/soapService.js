const soap = require('soap');
const fs = require('fs');
const request = require('request');
const hostUrl = process.env.HOST_URL + '/webhook/getWsdl';

const specialRequest = request.defaults({
    agentOptions: {
        ca: fs.readFileSync('./src/security/certificates/chain.pem')
    },
    strictSSL: false
})

const options = {
    request: specialRequest
};

const getClient = async () => {
    return new Promise((resolve, reject) => {
        soap.createClient(hostUrl, options, async (err, client) => {
            if(err){
                console.error(err);
                reject(err);
            }
            resolve(client);
        });
    })
}

module.exports = {
    getClient
}