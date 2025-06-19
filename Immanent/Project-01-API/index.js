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
        const id = Number(req.params.id);
        const body = req.body;

        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ status: "User not found" });
        }

        users[userIndex] = { ...users[userIndex], ...body };

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", error: err.message });
            }
            return res.json({ status: "User updated", user: users[userIndex] });
        });
    })
    .delete((req, res) => {
        const id = Number(req.params.id);

        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ status: "User not found" });
        }

        const deletedUser = users.splice(userIndex, 1);

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", error: err.message });
            }
            return res.json({ status: "User deleted", user: deletedUser[0] });
        });
    });


app.post("/api/users", (req, res) => {
    const body = req.body;
    const email = body.email;

    // Basic email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ status: "error", message: "Invalid or missing email" });
    }

    // Check for duplicate email
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
        return res.status(409).json({ status: "error", message: "Email already exists" });
    }

    // Create user
    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "error", error: err.message });
        }
        return res.json({ status: "Success", id: newUser.id });
    });
});


// app.post("/api/users", (req, res) => {
//     const body = req.body;
//     users.push({ ...body, id: users.length + 1 });
//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
//         if (err) {
//             return res.status(500).json({ status: "error", error: err.message });
//         }
//         return res.json({ status: "Success", id: users.length });
//     });
// });

app.listen(PORT, () => console.log("Server started at http://localhost:" + PORT));
