const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
};

// todoSchema.statics.findByTitle = function () {
//   return this.find({ title: /Gardening/i });
// };

todoSchema.statics = {
  findByTitle: function () {
    return this.find({ title: /Gardening/i });
  },
};

// query helpers
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") }); // new RegExp()
  },
};

module.exports = todoSchema;
