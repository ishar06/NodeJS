const http = require("http")
const fs = require("fs")

const Server1 = http.createServer((req,res)=>{
    const log = `${Date.now()} ${req.url} : New Request Received\n`
    fs.appendFile("log1.txt",log,(err,data)=>{
        switch (req.url){
            case "/":
                res.end("1: Home Page");
                break;
            case "/about":
                res.end("1: I am Ishardeep Singh");
                break;
            case "/contact-us":
                res.end("1: +91-8629826463");
                break;
            default:
                res.end("404 Not Found!")
                break;
        }
    })
})
Server1.listen(8000, ()=> console.log("Server1 Started!"));

const Server2 = http.createServer((req,res)=>{
    const log2 = `${Date.now()} ${req.url} New Req Received\n`
    fs.appendFile("log2.txt",log2,(err,data)=>{
        switch (req.url){
            case "/":
                res.end("2: HomePage");
                break;
            case "/about":
                res.end("2: About Page");
                break;
            case "/contact-us":
                res.end("2: Contact Us Page");
                break;
            default:
                res.end("404 Not Found!");
                break;
        }
    })
})
Server2.listen(8001, ()=> console.log("Server2 Started!"));