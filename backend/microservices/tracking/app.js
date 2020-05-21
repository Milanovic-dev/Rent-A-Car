const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
//app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.use(cors());

require('./src/api/trackingApi') (app);

app.listen(4000, () => {
    console.log("Tracking service is running!");
});
