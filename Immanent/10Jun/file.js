const fs = require("fs");

// Write Sync
// fs.writeFileSync('./test.txt', 'Hello World');

// Write Async
// fs.writeFile("./test.txt", "Hello Everyone", (err) => {})


// Read Sync
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);


// Read Async
// fs.readFile("./contacts.txt","utf-8",(err, result)=> {
//     if (err){
//         console.log("Error", err);
//     } else {
//         console.log(result);
//     }
// });


// Append Sync
// fs.appendFileSync("./test.txt",'Hey There\n');


// Copy Sync
// fs.cpSync("./test.txt", "copy.txt");

// Delete Sync
// fs.unlinkSync("./copy.txt");


// Stats Sync
// console.log(fs.statSync("./test.txt"));

// Make a new directory sync
// fs.mkdirSync('Docs');