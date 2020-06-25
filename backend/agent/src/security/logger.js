const fs = require('fs');
const moment = require('moment');
const LineReader = require('line-by-line');

const logger = () => {
    return function(req, res, next) {
        log(req, res);
        next();
    }
}

const log = async (req, res) => {

    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress

    const toLog = `[${moment().toISOString()}]: "${req.method} ${req.url} ${req.protocol.toUpperCase()}/${req.httpVersion} ${res.statusCode}"  ${req.hostname} ${ip} ${req.get('user-agent')} B ${JSON.stringify(req.body)} ${JSON.stringify(req.params)}\n`;
    const stream = fs.createWriteStream('logs.txt', {flags:'a'})
    stream.write(toLog);
    stream.end();
};

module.exports = {
    log
}