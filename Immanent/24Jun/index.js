const express = require("express");
const PORT = 8000;
const app = express();

const userRouter = require("./routes/user")
const {logReqRes} = require("./middlewares/index")

//Connection
const {connectMongoDB} = require("./connection")


// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);
connectMongoDB('mongodb://127.0.0.1:27017/Database1')


app.listen(PORT, () => console.log("Server started at http://localhost:" + PORT));
