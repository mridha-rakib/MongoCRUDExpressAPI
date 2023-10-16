const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = mongoose.model("Todo", todoSchema);
const app = express();
app.use(express.json());

// POST A TODO
router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo
    .save()
    .then(() => {
      console.log("Inserted Successfully");
    })
    .catch((err) => {
      console.log("Error:", err.message);
    });
});

// exports
module.exports = router;
