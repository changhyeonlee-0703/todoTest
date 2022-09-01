const express = require("express");
const router = express.Router();

const TodoController = require("../controller/todo");

// userId와 날짜를 받아올지
router
  .route("/")
  .post(TodoController.createTodo)
  .get(TodoController.getTodo)
  .put(TodoController.putTodo)
  .delete(TodoController.deleteTodo);


// todoId로 받아올지
// router
//   .route("/todoId")
//   .get(TodoController.getTodo)
//   .put(TodoController.putTodo)
//   .delete(TodoController.deleteTodo);

module.exports = router;
