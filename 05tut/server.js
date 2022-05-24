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

// app.use(cors())
//built in middleware to handle urlencoded data
//request handler (middleware for handling urlencoded data = form-data);
app.use(express.urlencoded({ extended: false }));

//built in  middleware for json
app.use(express.json());

//middleware ~ serve static files
app.use(express.static(path.join(__dirname, './public')));

//the get method is used to access the route

/**GET file tree route */
//basically, middleware are functins that have access to the res, req object
app.get('^/$|/index(.html)?', (req, res) => {
    //regEx specified with a route 
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //301 by default status
});

//404 routing error handler waterfall effect~ all

// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'view', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ error: "404 not found" });
//     } else {
//         res.type('txt').send("404 not found");
//     }
// });

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
}); //404 statuscode handler


//function chaining
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next() //moves on the next handler
}, (req, res) => {
    res.redirect(301, './views/index.html')
});

/**Get end */

//function chaining ~ middleware
//these route handlers work the same way of a middleware

/**start */
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send('Finished');
}
/**end */

app.get('/chain(.html)?', [one, two, three]);

//app recieve an error parameter
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
