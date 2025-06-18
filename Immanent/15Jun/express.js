
const express = require("express");
const PORT = 8000;

const app = express();

app.get('/', (req,res)=>{
    return res.send(`Hello from Home Page`  )
})
app.get('/about', (req,res)=>{
    return res.send(`Hello ${req.query.myname}`)
})

app.listen(PORT, ()=> console.log("Server1 started at http://localhost:" + PORT) )
