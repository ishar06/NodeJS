const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const PORT = 8000;
const app = express();

app.use(express.urlencoded({extended: false}));

// Connection
mongoose.connect('mongodb://127.0.0.1:27017/Database1')
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log("Mongo Error ", err))

// Schema
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    },
}, 
{timestamps: true}
)

const User = mongoose.model("user",userSchema);

app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user => `<li>${user.firstName} -- ${user.email} </li>`)).join("")}
    </ul>
    `
    return res.send(html);
});

app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});
   return res.json(allDbUsers);
});

app.route("/api/users/:id")
   .get(async (req, res) => {
       const user = await User.findById(req.params.id);
       return res.json(user);
   })
   .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastName : "Changed"})
       return res.status(501).json({ status: "Success" });
   })
   .delete(async (req, res) => {
        await User.findByIdAndDelete(req.params.id)
       return res.status(501).json({ status: "Success" });
   });


app.post("/api/users", async (req, res) => {
   const body = req.body;
   if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title ){
    return res.status(400).json({status:"All fields are required"});
   }

   const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
   })
   console.log("result", result);
   return res.status(201).json({msg : "Success"})
});


app.listen(PORT, () => console.log("Server started at http://localhost:" + PORT));
