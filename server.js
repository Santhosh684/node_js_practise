const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
app.use(express.json());

const filePath = path.join(__dirname, "data", "users.json");

// 1️⃣ GET all users
app.get("/users", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error reading users", error: err.message });
  }
});

app.get("/users/:id", async (req, res) => {


    try{

        const data = await fs.readFile(filePath, "utf-8");
        const users = JSON.parse(data);

        const id = Number(req.params.id);
        const user = users.find(u => u.id == id);

        if(user){
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch(err){
        res.status(500).json({ message: `Error reading user with ID ${req.params.id}`, error: err.message });
    }

});




// 2️⃣ POST add new user
app.post("/users", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);

    const newUser = { id: Date.now(), ...req.body };
    users.push(newUser);

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err.message });
  }
});

// 3️⃣ DELETE user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    let users = JSON.parse(data);

    users = users.filter(u => u.id != req.params.id);

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

// Invoke-RestMethod -Uri http://localhost:3000/users -Method GET

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
