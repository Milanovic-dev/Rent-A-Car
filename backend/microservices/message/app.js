const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json({limit:'20mb'}));
app.use(cors());
require('./src/api/messageApi')(app)


const server = http.createServer(app);

server.listen(4000, () => {
    console.log("Message service is running!");
});