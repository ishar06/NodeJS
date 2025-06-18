const http = require("http");
const fs = require("fs");

const PORT = 8000;

const Server = http.createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile("./data.txt", "utf-8", (err, dataFromFile) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Failed to read from 'data.txt'");
            }

            fs.readFile("home.html", "utf-8", (err, html) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    return res.end("Failed to load home.html");
                }

                const pageWithData = html.replace("FILE_DATA_HERE", dataFromFile);

                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(pageWithData);
            });
        });

    } else if (req.url === "/timer") {
        fs.readFile("timer.html", "utf-8", (err, html) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Failed to load timer.html");
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });

    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

Server.listen(PORT, () => {
    console.log("Server started on http://localhost:" + PORT);
});
