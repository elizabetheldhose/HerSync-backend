const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Create Task
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.user.id,
      priority: req.body.priority,
      dueDate: req.body.dueDate
    });

    await task.save();
    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Tasks
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const tasks = await Task.find().populate("assignedTo", "name email");
      console.log("tasks", tasks);
      return res.json(tasks);
    }

    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update Task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only admin or owner can update
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.priority = req.body.priority || task.priority;
    
    await task.save();
    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete Task
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only admin or owner can delete
    if (
      req.user.role !== "admin" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
