const http = require("http");
const fs = require("fs");

// const Server1 = http.createServer((req, res) => {
//     const log = `${Date.now()} ${req.url} : New Request\n`;
//     fs.appendFile("log.txt", log, (err, data) => {

//         switch (req.url) {

//             case "/":
//                 res.end("Home Page");
//                 break;

//             case "/about":
//                 res.end("About Page");
//                 break;

//             case "/timeout":
//                 // setTimeout executes the function after 3000ms (3 seconds)
//                 setTimeout(() => {
//                     res.end("Response after 3 seconds (setTimeout)");
//                 }, 3000);
//                 break;

//             case "/interval":
//                 res.writeHead(200, { "Content-Type": "text/html" });
//                 res.end(`
//                     <html>
//                     <body><h2 id="timer">Calculating...</h2>
//                     <script>
//                         function updateCountdown() {
//                             const now = new Date();
//                             const midnight = new Date();
//                             midnight.setHours(24,0,0,0);
//                             const diff = Math.floor((midnight - now) / 1000);
//                             const hrs = String(Math.floor(diff / 3600)).padStart(2, '0');
//                             const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
//                             const secs = String(diff % 60).padStart(2, '0');
//                             document.getElementById("timer").innerText = \`\${hrs}:\${mins}:\${secs}\`;
//                         }
//                         setInterval(updateCountdown, 1000);
//                         updateCountdown();
//                     </script>
//                     </body>
//                     </html>
//                 `);
//                 break;

//             default:
//                 res.end("404 Not Found");
//                 break;
//         }
//     });
// });

// Server1.listen(8000, () => console.log("Server1 Started"));


const Server1 = http.createServer((req,res)=>{
    switch(req.url){
        case "/":
            res.end("Home Page");
            break;  
        
        case "/timeout":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`
                <html>
                <body>
                    <h2>Wait for 2 seconds...</h2>
                    <p id="message"></p>
                    <script>
                        setTimeout(() => {
                            document.getElementById("message").innerText = "Delayed response by 2s";
                        }, 2000);
                    </script>
                </body>
                </html>
            `);
            break;

        
        case "/interval":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(`
                <html>
                <body><h2 id="timer">Calculating...</h2>
                <script>
                    function updateCountdown() {
                        const now = new Date();
                        const midnight = new Date();
                        midnight.setHours(24,0,0,0);
                        const diff = Math.floor((midnight - now) / 1000);
                        const hrs = String(Math.floor(diff / 3600)).padStart(2, '0');
                        const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
                        const secs = String(diff % 60).padStart(2, '0');
                        document.getElementById("timer").innerText = \`\${hrs}:\${mins}:\${secs}\`;
                    }
                    setInterval(updateCountdown, 1000);
                    updateCountdown();
                </script>
                </body>
                </html>
            `);
            break;

        default:
            res.end("404 Not Found");
            break;
    }
})
Server1.listen(8001, ()=> console.log("Server1 Started"));