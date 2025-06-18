const fs = require("fs");
const os = require("os");

// Write File Sync
fs.writeFileSync("./new.txt","Hello World ");

// Write File Async
fs.writeFile("./new2.txt","Hello Everyone ",(err)=>{});

// Read File Sync
const read = fs.readFileSync("./contacts.txt", "utf-8");
console.log(read);

// Read File Async
fs.readFile("contacts.txt","utf-8",(err, result)=>{
    if(err){
        console.log("Error: ", err);
    }else{
        console.log(result);
    }
})

// Append File Sync
fs.appendFileSync("./contacts.txt","Appended Line Block\n");
const read2 = fs.readFileSync("./contacts.txt","utf-8");
console.log(read2);

// Copy Sync
fs.copyFileSync("./contacts.txt","copy.txt");
const read3 = fs.readFileSync("./copy.txt","utf-8");
console.log(read3);

// Delete Sync
fs.unlinkSync("./copy.txt");

// Mkdir sync
fs.mkdirSync("Docs");

//---------------------------------

// console.log(os.cpus().length);

console.log("1");

// Blocking Operations || Sync
const read4 = fs.readFileSync("./contacts.txt","utf-8");
console.log(read4);

// Async || Non-Blocking
fs.readFile("./contacts.txt","utf-8", (err, result)=>{
    if (err){
        console.log("Error: ", err)
    }else{
        console.log(result);
    }
})

console.log("2");
console.log("3");
console.log("4");
