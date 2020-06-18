const fs = require('fs');

const logger = (req, res, next) => {
    log(req, res);
    next();
}

const log = async (req, res) => {
    const toLog = `${Date.UTC()}: ${req.method} \n`;

    const stream = fs.createWriteStream('./logs.txt', {flags:'a'})
    stream.write(toLog);
    stream.end();
};

module.exports = {
    logger
}