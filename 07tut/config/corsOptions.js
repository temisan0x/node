//cors ~ cross origin resource sharing
//domains allowed to access our backend;
const whitelist = [
    'https://www.site.com',
    'http://127.0.0.1:5000',
    'http://localhost:3500'
];

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

module.exports = corsOptions;