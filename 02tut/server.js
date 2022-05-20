const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        //unlink is what you'd use to delete a file
        await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'))
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'),'utf8');
        
        // const readData = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\n Temi', 'utf8');
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseWrite.txt'), 'utf8');
        console.log(newData);
        
    } catch (errors) {
        console.error(errors);   
    }
}

fileOps();

// fs.readFile(path.join(__dirname, "files", "starter.txt"), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//     // console.log(data.toString());  
// })



// fs.writeFile(path.join(__dirname, "files", "reply.txt"), `It's nice to meet you`, (err) => {
//     if (err) throw err;
//     console.log("Write complete");

//     fs.appendFile(path.join(__dirname, "files", "reply.txt"), "\n\n\ texting texting", (err) => {
//         if (err) throw err
//         console.log("Append Complete");

//         fs.rename(path.join(__dirname, "files", "reply.txt"), path.join(__dirname, "files", "newReply.txt"), (err) => {
//             if (err) throw err;
//             console.log("Rename Complete");
//         })

//     })
// })

// fs.unlink(path.join(__dirname, "files", "starter.txt"), (err, data)=> {
//     if (err) throw err;
//     console.log(data);
    
// })
//exit on uncaught errors
process.on('hello', err => {
    console.error(`there's a big error somewhere in your code: ${err}`);
    process.exit(1)
}) 
