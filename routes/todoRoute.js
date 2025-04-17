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

const authService = require("../services/authService");

const router = express.Router();

router.route("/").get(authService.protect,
getAllTodos).post(createTodoValidator, createTodo);
router
  .route("/:id")
  .get(getTodoValidator, getTodo)
  .put(
    authService.protect,
    authService.allowedTo("admin", "manager"),
    updateTodoValidator,
    updateTodo
  )
  .delete(
    authService.protect,
    deleteTodoValidator,
    deleteTodo
  );

module.exports = router;
