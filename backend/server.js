const express = require("express");

const app = express();

const PORT = 3000;

// Allows our API to receive JSON data
app.use(express.json());

// Temporary in-memory task storage
let tasks = [
    {
        id: 1,
        title: "Learn Docker",
        description: "Understand Docker basics",
        status: "pending"
    },
    {
        id: 2,
        title: "Learn GitHub",
        description: "Learn Git and GitHub workflow",
        status: "completed"
    }
];

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "DevOps Task Manager API is running!"
    });
});

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// GET a single task
app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});

// CREATE a task
app.post("/tasks", (req, res) => {
    const { title, description } = req.body;

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status: "pending"
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// UPDATE a task
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { title, description, status } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    res.json(task);
});

// DELETE a task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});