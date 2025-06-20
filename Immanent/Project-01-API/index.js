const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const PORT = 8000;
const app = express();

app.use(express.urlencoded({extended:false}));

app.get("/users",(req,res)=>{
    fs.readFile("./users.html","utf-8",(err,html)=>{
        if (err){
            res.writeHead(500, {"content-type":"text/plain"});
            return res.end("Failed to load users.html");
        }
        res.writeHead(200, {"content-type":"text/html"});
        return res.end(html);
    })
})

app.get("/api/users",(req,res)=>{
    return res.json(users);
})

app.route("/api/users/:id")
    .get((req,res)=>{
        const id = Number(req.params.id);
        const user = users.find((user)=> id === user.id);
        return res.json(user);
    })
    .patch((req,res)=>{
        const id = Number(req.params.id);
        const body = req.body;
        const email = body.email;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)){
            return res.status(400).json({status:"Invalid Email or Missing Email"});
        }

        const emailExists = users.some((user)=> email === user.email);
        if (emailExists){
            return res.status(409).json({status:"Email already exists"});
        }

        const userIndex = users.findIndex((user)=> id === user.id);
        if (userIndex === -1){
            return res.status(404).json({status:"User Not Found"});
        }
        users[userIndex] = {...users[userIndex],...body};

        fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
            if (err){
                return res.status(500).json({status:"Error", error:err.message})
            }
            return res.json({status:"User Updated", user : users[userIndex]});
        })
    })
    .delete((req,res)=>{
        const id = Number(req.params.id);
        const userIndex = users.findIndex((user)=> id === user.id);
        if (userIndex === -1){
            return res.status(404).json({status:"User Not Found"});
        }
        const deletedUser = users.splice(userIndex,1);
        
        fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
            if (err){
                return res.status(500).json({status:"Error", error:err.message})
            }
            return res.json({status:"User Deleted", user : deletedUser[0]});
        })
    })

app.post("/api/users",(req,res)=>{
    const body = req.body;
    const email = body.email;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)){
        return res.status(400).json({status:"Invalid Email or Missing Email "});
    }

    const emailExists = users.some((user)=> email === user.email);
    if (emailExists){
        return res.status(409).json({status:"Email already exists"});
    }

    const newUser = {...body, id:users.length + 1};
    users.push(newUser);

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if (err){
            return res.status(500).json({status:"Error",error:err.message});
        }
        return res.json({status:"User Added", id:newUser.id});
    })

})


app.listen(PORT, ()=> console.log("Server started at http://localhost:"+PORT));