const fs = require('fs');
const moment = require('moment');
const LineReader = require('line-by-line');

const logger = () => {
    return function(req, res, next) {
        log(req, res);
        next();
    }
}

const log = async (req, res, type, options) => {

    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress

    const toLog = `[${moment().toISOString()}]: ${type.toUpperCase()} ${res.statusCode == '401' ? 'Unauthorized access' : ""} "${req.method} ${req.url} ${req.protocol.toUpperCase()}/${req.httpVersion} ${res.statusCode}"  ${req.hostname} ${ip} ${req.device.type.toUpperCase()} ${req.get('user-agent')} ${JSON.stringify(req.params)} ${options ? JSON.stringify(options) : "-"}\n`;
    const stream = fs.createWriteStream('logs.txt', {flags:'a'})
    stream.write(toLog);
    stream.end();
};

const logCustom = (log) => {
    const toLog = `[${moment().toISOString()}]: ${log}\n`
    const stream = fs.createWriteStream('logs.txt', {flags:'a'})
    stream.write(toLog);
    stream.end();
}

module.exports = {
    log,
    logCustom
}