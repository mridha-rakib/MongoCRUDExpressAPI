const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

// express app initialization
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/todos")
  .then(() => {
    {
      console.log("todo Db is connected");
    }
  })
  .catch((err) => {
    console.log("Db is not connected");
    console.log(err);
    process.exit(1);
  });

// application routes
app.use("/todo", todoHandler);

app.listen(3000, () => {
  console.log("Listening port on : 3000");
});
