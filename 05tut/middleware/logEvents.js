const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

let fs = require('fs')
let fsPromises = require('fs').promises;
let path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    //tab delimited log file
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`; //t ~ tab
    //logNameing
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname,'..', 'logs'))){
            await fsPromises.mkdir(path.join(__dirname,'..', 'logs'));
        }
        //appendFile creats a file if it doesnt exist in the try block
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (errors) {
        console.log(errors);
    }
}

//customer middleware function errLog handler
const logger = ((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}\t`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next();
});

module.exports = {logger, logEvents};


