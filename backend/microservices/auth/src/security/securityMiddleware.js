"use strict";
const helmet = require('helmet');
const session = require('express-session');
const hpp = require('hpp');
const stripTags = require('striptags');
const cookieParser = require('cookie-parser');


const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, //https 
        httpOnly: true  //prevents client side js to access cookie, against xss
    }
}

const config = (app, server) => {
    app.use(helmet()); //https://helmetjs.github.io/
    app.use(hpp());//https://www.npmjs.com/package/hpp
    app.use(sanitizeInput);//https://www.npmjs.com/package/mongo-sanitize
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(session(sessionConfig));//https://www.npmjs.com/package/express-session
}

const sanitizeInput = (req, res, next) => {
    if (!req) next();
    const cleanParams = sanitize(req.params);
    const cleanBody = sanitize(req.body);

    req.params = cleanParams;
    req.body = cleanBody;

    next();
};

const sanitize = function (v) {
    if (v instanceof Object) {
      for (var key in v) {
        if(typeof(v[key] == 'String')){
            v[key] = stripTags(v[key]);
        }
        if (/^\$/.test(key)) {
          delete v[key];
        } else {
          sanitize(v[key]);
        }
      }
    }
    return v;
};


module.exports = {
    config
}