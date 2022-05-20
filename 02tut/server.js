const fs = require('fs');
const path = require('path')

fs.readFile(path.join(__dirname, "files", "starter.txt"), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    // console.log(data.toString());  
})

fs.writeFile(path.join(__dirname, "files", "reply.txt"), `It's nice to meet you`, (err) => {
    if (err) throw err;
    console.log("Write complete");

    fs.appendFile(path.join(__dirname, "files", "reply.txt"), "\n\n\ texting texting", (err) => {
        if (err) throw err
        console.log("Append Complete");

        fs.rename(path.join(__dirname, "files", "reply.txt"), path.join(__dirname, "files", "newReply.txt"), (err) => {
            if (err) throw err;
            console.log("Rename Complete");
        })

    })
})


//exit on uncaught errors
process.on('hello', err => {
    console.error(`there's a big error somewhere in your code: ${err}`);
    process.exit(1)
}) 
