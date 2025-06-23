const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const PORT = 8000;

const app = express();

app.use(express.urlencoded({extended: false}));

app.get("/users", (req, res) => {
   const html = `
   <ul>
   ${users.map((user => `<li>${user.first_name}</li>`)).join("")}
   </ul>
   `
   return res.send(html);
});

app.get("/api/users", (req, res) => {
   return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
   const id = Number(req.params.id);
   const user = users.find((user) => id === user.id);
   return res.json(user);
});


app.route("/api/users/:id")
   .get((req, res) => {
       const id = Number(req.params.id);
       const user = users.find((user) => id === user.id);
       return res.json(user);
   })
   .patch((req, res) => {
       return res.json({ status: "pending" });
   })
   .delete((req, res) => {
       return res.json({ status: "pending" });
   });


app.post("/api/users", (req, res) => {
   const body = req.body;
   users.push({ ...body, id: users.length + 1 });
   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
       if (err) {
           return res.status(500).json({ status: "error", error: err.message });
       }
       return res.json({ status: "Success", id: users.length });
   });
});


app.listen(PORT, () => console.log("Server started at http://localhost:" + PORT));
