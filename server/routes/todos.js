const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add a todo
router.post("/", async (req, res) => {
  try {
    if (!req.body.text || !req.body.text.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }
    const todo = await Todo.create({ text: req.body.text.trim() });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// toggle done
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
