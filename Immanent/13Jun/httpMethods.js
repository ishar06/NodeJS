const http = require("http");
const fs = require("fs");
const url = require("url");

const Server1 = http.createServer((req,res)=>{
    if (req.url === "/favicon.co") return res.end();
    const log = `${Date.now()} ${req.method} ${req.url} : New Request Received\n`;
    const myUrl = url.parse(req.url, true);
    fs.appendFile("log.txt",log,(err,data)=>{
        switch(myUrl.pathname){
            case "/":
                if (req.method === "GET"){
                    res.end("Home Page")
                }
                break;
            case "/about":
                const username = myUrl.query.myname;
                res.end(`Hi, ${username}`);
                break;
            case "/contact-us":
                res.end("+91-8629826463");
                break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are your results for " + search);
                break;
            case "/signup":
                if (req.method === "GET"){
                    res.end("Assume this as a signup form");
                }else if (req.method === "POST"){
                    // DB Query here
                    res.end("Success");
                }
                break;
            default:
                res.end("404 Not Found");
                break;
        }
    })
})
Server1.listen(8000, ()=> console.log("Server1 started"));