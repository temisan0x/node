const fs = require('fs');

if (!fs.existsSync('./new')) {
    fs.mkdir('./new', function (err) {
        if (err) throw err;
        return console.log('New directory created');
    })
}

if (fs.existsSync('./new')) {
    fs.rmdir('./new', function (err) {
        if (err) throw err;
        return console.log('Directory removed');
    })
} 