const fs = require('fs');

if (!fs.existsSync('./new')) {
    fs.mkdir('./new', function (err) {
        if (err) throw err;
        return console.log('New directory created');
    })
}