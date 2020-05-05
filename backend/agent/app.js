const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const soap = require('soap');

app.use(bodyParser.json());
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.use(cors());

require('./src/api/carApi') (app);
require('./src/api/pricelistApi') (app);
const server = http.createServer(app);

server.listen(8282, () => {
    console.log("Agent running on port 8282");
});

// Soap server
const service = {
    MyService: {
        MyPort: {
            TestSoap: function(args) {
                return {
                    name: args.name
                };
            }
        }
    }
};
const xml = require('fs').readFileSync('service.wsdl', 'utf8');

soap.listen(server, '/wsdl', service, xml, function(){
    console.log("Soap services activated");
});

app.get('/', (req, res) => {
    res.send('This is agent backend');
});
