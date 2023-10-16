const express = require("express");
const mongoose = require("mongoose");

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

app.listen(3000, () => {
  console.log("Listening port on : 3000");
});
