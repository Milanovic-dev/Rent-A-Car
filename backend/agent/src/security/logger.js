const fs = require('fs');

const logger = () => {
    return function(req, res, next) {
        log(req, res);
        next();
    }
}

const log = async (req, res) => {
    const toLog = `${Date.now()}: METHOD:${req.method} ${req.url} PROTOCOL:${req.protocol} HOST:${req.hostname} IP:${req.ip} \n`;

    const stream = fs.createWriteStream('logs.txt', {flags:'a'})
    stream.write(toLog);
    stream.end();
};

module.exports = {
    logger
}