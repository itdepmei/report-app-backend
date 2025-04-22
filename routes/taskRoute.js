const express = require("express");
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  createFilterObject,
} = require("../services/taskService");

const {
  getTaskValidator,
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
} = require("../utils/validators/taskValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObject, getAllTasks)
  .post(createTaskValidator, createTask);

router
  .route("/:id")
  .get(getTaskValidator, getTask)
  .put(updateTaskValidator, updateTask)
  .delete(deleteTaskValidator, deleteTask);

module.exports = router;
