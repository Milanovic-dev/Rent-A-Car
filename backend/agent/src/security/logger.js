const fs = require('fs');
const moment = require('moment');
const LineReader = require('line-by-line');
const ipLocation = require('iplocation');

const Transform = require('stream').Transform;
const util = require('util');

const maxFileSizeInBytes = 100000;

const logger = () => {
    return function(req, res, next) {
        log(req, res);
        next();
    }
}

const log = async (req, statusCode) => {

    var ip = req.ip
    //const location = await ipLocation('127.0.0.1');
    //console.log(location);
    var type = 'INFO';
    var token = req.headers.authorization ? "Has Bearer" : "No Bearer";

    if(Math.floor(statusCode/100) == 4){
        type = 'WARNING'
    }else if(Math.floor(statusCode/100) == 5){
        type = 'ERROR'
    }
    
    var reason;

    if(statusCode == '401'){
        reason = "Reason: Unauthrozied access";
    }

    const toLog = `[${moment().toISOString()}]: ${type} ${reason ? reason : ""} "${req.protocol.toUpperCase()}/${req.httpVersion} ${req.secure ? "TLS" : "NO TLS"} ${req.method} ${req.url} ${statusCode}"  ${req.hostname} ${ip} ${req.get('user-agent')} ${req.get('content-type')} ${req.get('content-length') ? req.get('content-length') : "*"} ${token} ${JSON.stringify(req.params)} ${JSON.stringify(req.query)} \n`;
    const stream = fs.createWriteStream('logs.log', {flags:'a'})
    stream.write(toLog); 
    stream.end();

    const fileSizeInBytes = getFilesizeInBytes('logs.log');

    if(fileSizeInBytes >= maxFileSizeInBytes){
        var input = fs.createReadStream('logs.log');
        var output = fs.createWriteStream('logs.log');
    
        input
        .pipe(RemoveFirstLine())
        .pipe(output);
    }

};

const logCustom = (log) => {
    const toLog = `[${moment().toISOString()}]: ${log}\n`
    const stream = fs.createWriteStream('logs.log', {flags:'a'})
    stream.write(toLog);
    stream.end();
}

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}

function RemoveFirstLine(args) {
    if (! (this instanceof RemoveFirstLine)) {
        return new RemoveFirstLine(args);
    }
    Transform.call(this, args);
    this._buff = '';
    this._removed = false;
}
util.inherits(RemoveFirstLine, Transform);

RemoveFirstLine.prototype._transform = function(chunk, encoding, done) {
    if (this._removed) { // if already removed
        this.push(chunk); // just push through buffer
    } else {
        // collect string into buffer
        this._buff += chunk.toString();

        // check if string has newline symbol
        if (this._buff.indexOf('\n') !== -1) {
            // push to stream skipping first line
            this.push(this._buff.slice(this._buff.indexOf('\n') + 2));
            // clear string buffer
            this._buff = null;
            // mark as removed
            this._removed = true;
        }
    }
    done();
};

module.exports = {
    log,
    logCustom
}