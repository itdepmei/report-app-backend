const express = require("express");
const {
  getTodoValidator,
  createTodoValidator,
  updateTodoValidator,
  deleteTodoValidator,
} = require("../utils/validators/todoValidator");
const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../services/todoService");

const router = express.Router();

router.route("/").get(getAllTodos).post(createTodoValidator, createTodo);
router
  .route("/:id")
  .get(getTodoValidator, getTodo)
  .put(updateTodoValidator, updateTodo)
  .delete(deleteTodoValidator, deleteTodo);

module.exports = router;
