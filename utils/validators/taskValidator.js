const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Create Task Validator
exports.createTaskValidator = [
  check("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 2 })
    .withMessage("title must be at least 2 characters"),

  check("timeStart")
    .notEmpty()
    .withMessage("timeStart is required")
    .isString()
    .withMessage("timeStart must be a string"),

  check("timeEnd")
    .notEmpty()
    .withMessage("timeEnd is required")
    .isString()
    .withMessage("timeEnd must be a string"),

  check("note")
    .optional(),

  check("report")
    .notEmpty()
    .withMessage("report ID is required")
    .isMongoId()
    .withMessage("Invalid report ID format"),

  validatorMiddleware,
];

// Get Task Validator
exports.getTaskValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid task ID"),
  validatorMiddleware,
];

// Update Task Validator
exports.updateTaskValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid task ID"),
  validatorMiddleware,
];

// Delete Task Validator
exports.deleteTaskValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid task ID"),
  validatorMiddleware,
];
