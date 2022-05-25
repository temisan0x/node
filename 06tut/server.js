const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

//custom middleware logger
//grabs the data when submitted
//these reads file in the directory
app.use(logger);

//cors ~ cross origin resource sharing
//domains allowed to access our backend;
const whitelist = ['https://www.site.com', 'http://127.0.0.1:5000', 'http://localhost:3500'];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by Cors'))
        }
    },
    optionsSucessStatus: 200
}

app.use(cors(corsOptions));

//built in middleware to handle urlencoded data
//request handler (middleware for handling urlencoded data = form-data);
app.use(express.urlencoded({ extended: false }));

//built in  middleware for json
app.use(express.json());

//middleware ~ serve static files
app.use(express.static(path.join(__dirname, './public')));

/**serve static files */
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/subdir', express.static(path.join(__dirname, './public')));
/**serve static files */

/**route files*/
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));
/**route files */

//404 routing error handler waterfall effect~ all

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: "404 not found" });
    } else {
        res.type('txt').send("404 not found");
    }
});

//function chaining
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next() //moves on the next handler
}, (req, res) => {
    res.redirect(301, './views/index.html')
});

/**Get end */

//app recieve an error parameter
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
