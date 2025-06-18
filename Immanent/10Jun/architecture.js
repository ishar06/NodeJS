const fs = require("fs");
const os = require("os");

// console.log(os.cpus().length);

console.log("1");

// Async || Non-Blocking
fs.readFile("./contacts.txt","utf-8",(err,result)=>{
    console.log(result);
})

// Sync  || Blocking
const result = fs.readFileSync("./contacts.txt","utf-8");
console.log(result);

console.log("2");
console.log("3");
console.log("4");
