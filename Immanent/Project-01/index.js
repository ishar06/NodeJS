const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({extended: false}));


app.get("/users", (req,res)=>{
    const html = `
    <ul>
    ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

app.get("/api/users", (req,res)=>{
    return res.json(users);
})

app
    .route("/api/users/:id")
    .get((req,res)=>{
        const id = Number(req.params.id);
        const user = users.find((user)=> user.id === id);
        return res.json(user);
    })
    .patch((req,res)=>{
        const id = Number(req.params.id);
        const userIndex = users.find((user)=> user.id === id);
        if (userIndex === -1){
            return res.status(404).json({error:"User Not Found"});
        }
        users[userIndex] = {...users[userIndex], ...req.body};
        




    })
    .delete((req,res)=>{
        return res.json({status : "pending"});

    })


app.post("/api/users", (req, res) => {
    const body = req.body;
    const newUser = { id: users.length + 1, ...body };  // Add ID to the user object
    users.push(newUser);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to write to file" });
        }
        return res.json({status: "Success", id: users.length})
    });
});



app.listen(PORT, ()=> console.log("Server started at http://localhost:"+PORT));