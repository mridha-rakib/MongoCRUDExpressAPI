const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = mongoose.model("Todo", todoSchema);
const app = express();
app.use(express.json());

// GET ALL THE TODOS
router.get("/", (req, res) => {
  Todo.find({ status: "active" })
    .select({
      _id: 0,
      __v: 0, // Corrected the field name
      date: 0,
    })
    .limit(3)
    .exec()
    .then((data) => {
      res.status(200).json({
        result: data,
        message: "Success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "There was a server side error!",
      });
    });
});

// GET active todos
router.get("/active", async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({
    data,
  });
});

// GET ACTIVE TODOS
router.get("/title", async (req, res) => {
  try {
    const data = await Todo.findByTitle();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET TODOS BY LANGUAGE
router.get("/language", async (req, res) => {
  const data = await Todo.find().byLanguage("react");
  res.status(200).json({
    data,
  });
});

// GET A TODO by ID
router.get("/:id", (req, res) => {
  Todo.find({ _id: req.params.id })
    .select({
      _id: 0,
      __v: 0, // Corrected the field name
      date: 0,
    })
    .then((data) => {
      res.status(200).send(data);
      //   res.status(200).json({
      //     result: data,
      //     message: "Success",
      //   });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        error: "There was a server side error!",
      });
    });
});

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

router.post("/all", (req, res) => {
  Todo.insertMany(req.body)
    .then(() => {
      res.status(200).json({
        message: "Todos were inserted successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "There was a server side error!" + err.message,
      });
    });
});

// updataOne
router.put("/:id", (req, res) => {
  const result = Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: "Islam",
        status: "active",
      },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .then((data) => {
      res.status(200).json({
        message: "Todo was updated successfully!",
        Data: data,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({
        error: "There was a server side error!",
      });
    });
});

// Update many
router.put("/updateMany", async (req, res) => {
  try {
    const query = { status: "active" };
    const updateData = { $set: { status: "inactive" } };

    const result = await Todo.updateMany(query, updateData);
    res.json({
      message: "Document updated successfully",
      Data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE TODO
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Todo was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "There was a server side error!",
      });
    });
});

// exports
module.exports = router;
