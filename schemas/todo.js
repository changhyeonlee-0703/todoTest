const mongoose = require("mongoose");
const moment = require("moment");

const todolistSchema = mongoose.Schema(
  {
    work : String,
    isDone : Boolean,
    color : String,
  });

const todosSchema = mongoose.Schema(
  {
    todoArr: [todolistSchema],
    // createAt : {
    //   type : Date,
    //   default : moment().format("YYYY-MM-DD"),
    // }
  },
  { timestamps : true}
  // { timestamps: true }
);

module.exports = mongoose.model("Todos", todosSchema);
