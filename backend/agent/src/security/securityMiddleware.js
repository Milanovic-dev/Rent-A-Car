"use strict";
const helmet = require('helmet');
const sanitize = require('mongo-sanitize');
const toobusy = require('toobusy-js');
const session = require('express-session');
const hpp = require('hpp');

const csrf = require('csurf');

const csrfProtection = csrf({cookie:true});
const { logCustom } = require('./logger');

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure:true, //https 
        httpOnly: true  //prevents client side js to access cookie, against xss
    }
}

const config = (app, server) => {
    app.use(helmet()); //https://helmetjs.github.io/
    app.use(hpp());//https://www.npmjs.com/package/hpp
    app.use(sanitizeInput);//https://www.npmjs.com/package/mongo-sanitize
    app.use(ddosProtection);//https://www.npmjs.com/package/toobusy-js
    app.use(session(sessionConfig));//https://www.npmjs.com/package/express-session

    toobusy.onLag((currentLag) => {
        logCustom("Event loop lag detected! Latency: " + currentLag + "ms");
    });

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

const ddosProtection = (req, res, next) => {
    if(toobusy()){
        res.send(503, 'Server is too busy right now, try again later.');
    }
    else
    {
        next();
    }
};

module.exports = {
    config,
    csrfProtection
}