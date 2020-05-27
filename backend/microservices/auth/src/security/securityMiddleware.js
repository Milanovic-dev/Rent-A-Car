"use strict";
const helmet = require('helmet');
const sanitize = require('mongo-sanitize');
const session = require('express-session');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure:false, //https 
        httpOnly: true  //prevents client side js to access cookie, against xss
    }
}

const config = (app, server) => {
    app.use(helmet()); //https://helmetjs.github.io/
    app.use(hpp());//https://www.npmjs.com/package/hpp
    app.use(sanitizeInput);//https://www.npmjs.com/package/mongo-sanitize
    app.use(session(sessionConfig));//https://www.npmjs.com/package/express-session
    app.use(cookieParser(process.env.SESSION_SECRET));
    process.on('SIGINT', () => {
        if(server){
            server.close();
            toobusy.shutdown();
            process.exit();
        }
    });
}

const sanitizeInput = (req, res, next) => {
    if(!req) next();
    const cleanParams = sanitize(req.params);
    const cleanBody = sanitize(req.body);
    
    req.params = cleanParams;
    req.body = cleanBody;

    next();
};

module.exports = {
    config
}