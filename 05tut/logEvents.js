const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

const fs = require('fs')
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    //tab delimited log file
    const logItem = `${dateTime}\t${uuid()}\t${message}${logName}\n`; //t ~ tab
    //logNameing
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        //appendFile creats a file if it doesnt exist in the try block
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch (errors) {
        console.log(errors);
        
    }
}

module.exports = logEvents;

