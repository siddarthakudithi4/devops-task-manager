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

const getTasks = (req, res) => {
    res.json(tasks);
};

const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
};

const createTask = (req, res) => {
    const { title, description } = req.body;

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status: "pending"
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
};

const updateTask = (req, res) => {
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
};

const deleteTask = (req, res) => {
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
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};