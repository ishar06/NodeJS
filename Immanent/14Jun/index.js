const http = require("http");
const fs = require("fs");

const PORT = 8000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
    fs.readFile("./data.txt", "utf8", (err, data) => {
        if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Failed to read data.txt");
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
        <html>
        <head>
            <title>Home Page</title>
            <style>
            body {
                font-family: Arial;
                background-color: orange;
                padding: 30px;
                text-align: center;
            }
            a {
                margin-top: 25px;
                text-decoration: underline;
                color: darkblue;
                font-weight: bold;
            }
            h2, p{
                text-align: left;
            }
            </style>
        </head>
        <body>
            <h2>Data From File </h2>
            <p id="fileText">${data}</p>
            <h3 id="message"></h3>

            <a href="/timer">Go to Timer Page</a>

            <script>
            setTimeout(() => {
                document.getElementById("message").innerText = "Delayed message";
            }, 2000);
            </script>
        </body>
        </html>
        `);
    });
  } else if (req.url === "/timer") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
      <head>
        <title>Timer Page</title>
        <style>
          body {
            font-family: Arial;
            background-color: aqua;
            padding: 30px;
            text-align: center;
          }
          #timer {
            font-size: 36px;
            margin-bottom: 20px;
            color: darkred;
          }
          button {
            padding: 10px 20px;
            margin: 8px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid black;
            background-color: beige;
            color: darkblue;
            cursor:pointer;
          }
          button:hover {
            background-color: lightcoral;
            color: white;
          }
          a {
            display: block;
            margin-top: 30px;
            text-decoration: underline;
            color: teal;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div id="timer">00:00:00</div>
        <button onclick="startTimer()">Start</button>
        <button onclick="stopTimer()">Stop</button>
        <button onclick="resumeTimer()">Resume</button>
        <a href="/">Back to Home</a>

        <script>
          let seconds = 0;
          let interval;

          function formatTime(s) {
            const hrs = String(Math.floor(s / 3600)).padStart(2, '0');
            const mins = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
            const secs = String(s % 60).padStart(2, '0');
            return hrs+":"+mins+":"+secs;
          }

          function updateDisplay() {
            document.getElementById("timer").innerText = formatTime(seconds);
          }

          function startTimer() {
            clearInterval(interval);
            seconds = 0;
            updateDisplay();
            interval = setInterval(() => {
              seconds++;
              updateDisplay();
            }, 1000);
          }

          function stopTimer() {
            clearInterval(interval);
          }

          function resumeTimer() {
            clearInterval(interval);
            interval = setInterval(() => {
              seconds++;
              updateDisplay();
            }, 1000);
          }
        </script>
      </body>
      </html>
    `);

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});
