const http = require("http")

const Server1 = http.createServer((req,res)=>{
    switch (req.url){
        case "/":
            res.end("Home Page");
            break;

        case "/timeout":
            res.writeHead(200, {"content-type":"text/html"});
            res.end(`
                <html>
                <head><title>TimeOutPage</title></head>
                <body>
                <h4>TIME OUT PAGE </h4>
                <h6>Wait for 2 seconds for the delayed message to appear</h6>
                <p id="message"></p>
                    <script>
                        setTimeout(()=>{
                            document.getElementById("message").innerText = "Delayed message";
                            },2000);
                    </script>
                </body>
                </html>
 
                `)
            break;

        case "/interval":
            res.writeHead(200,  {"content-type":"text/html"})
            res.end(`
                <html>
                <head><title>Midnight Counter</title></head>
                <body>
                <h4>MIDNIGHT COUNTER</h4>
                <p id="time"></p>
                <script>
                    function Countdown(){
                        const now = new Date();
                        const midnight = new Date();
                        midnight.setHours(24,0,0,0);

                        const diff = Math.floor((midnight-now)/1000);
                        const hours = String(Math.floor(diff/3600)).padStart(2,'0');
                        const mins = String(Math.floor((diff%3600)/60)).padStart(2,'0');
                        const secs = String(Math.floor(diff%60)).padStart(2,'0');

                        document.getElementById("time").innerText = hours+":"+mins+":"+secs;
                    }
                        setInterval(Countdown, 1000);
                        Countdown();
                
                </script>
                </body>
                </html>
                
                `)
                
            break;

        default:
            res.end("404 Not Found");
            break;
    }
});

Server1.listen(8000, () => console.log("Server1 Started"));
