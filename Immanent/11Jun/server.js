const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req,res)=>{
    const log = `${Date.now()}: ${req.url} New Request Received\n`;
    fs.appendFile("log.txt",log, (err,data)=>{
        switch (req.url){
            case '/':
                res.end("Home Page");
                break;
            case '/about':
                res.end("I am Ishardeep Singh");
                break;
            case '/contact-us':
                res.end("+91-1234567890");
                break;
            default:
                res.end("404 Not Found!")
                break;
        }
    })
    
})
myServer.listen(8000, ()=> console.log("Server 1 Started!"));


const Server = http.createServer((req,res)=>{
    const log2 = `${Date.now()}: ${req.url} New Req Received\n`;
    fs.appendFile("log2.txt",log2, (err,data)=>{
        switch (req.url){
            case '/':
                res.end("Home Page");
                break;
            case '/about':
                res.end("I am Ishardeep Singh");
                break;
            case '/contact-us':
                res.end("+91-1234567890");
                break;    
            default:
                res.end("404 Not Found!"); 
                break;           
        }
    })
})
Server.listen(8001, ()=> console.log("Server 2 Started"));


const Server3 = http.createServer((req,res)=>{
    const log3 = `${Date.now()}: ${req.url} New Req Received\n`;
    fs.appendFile("log3.txt",log3,(err,data)=>{
        switch(req.url){
            case '/':
                res.end("Home Page 3");
                break;
            case '/about':
                res.end("3: I am Ishardeep Singh");
                break;
            case '/contact-us':
                res.end("3: +91-8629826463");
                break;
            default:
                res.end("3: 404 Not Found!");
                break;
        }
    })
})
Server3.listen(8002, ()=>console.log("Server 3 Started"));
