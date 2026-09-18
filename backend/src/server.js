const express = require("express");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "DevOps Task Manager API is running!"
    });
});

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});