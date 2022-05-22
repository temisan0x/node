const logEvents = require("./logEvents");

const http = require('http');
const path = require('path');
const fs = require('fs')
// const logEvents from './logEvents';
const EventEmitter = require('events');
//common required modules

const fsPromises = require('fs').promises;

class Emitter extends EventEmitter { };

//initialize object
const myEmitter = new Emitter();
myEmitter.on('log', (msg,fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        const data = contentType === 'application/json'
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200,
            { 'Content-Type': contentType });
        
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        );
    } catch (error) {
        console.log(error);
        //emitter to check for error
        myEmitter.emit('log', `${error.name}: ${error.message}`, 'errLog.txt')
        response.statusCode = 500;
        response.end();
    }
}

//server listening address
const server = http.createServer((req, res) => {

    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')
    //build a path and then serve the file 
    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case 'png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain'
            break
        default:
            contentType = 'text/html';
    }

    //chain tenairy statement

    let filePath =
        contentType == 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType == 'text/html' && req.url.slice(-1) === '1'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType == 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);

    //makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';

    const fileExists = fs.existsSync(filePath);

    //condition to check if fileExists 
    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page-html':
                res.writeHead(301, { 'Location': '/new-page-html' });
                res.end();
                break;
            case 'www-page-html':
                res.writeHead(301, { 'Location': '/' });
                res.end();
                break;
            default:
                //serve a 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        }
    }
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
