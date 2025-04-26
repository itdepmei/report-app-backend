const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Create Obstacle Validator
exports.createObstacleValidator = [
  check("timeStart")
  .optional(),

  check("timeEnd")
  .optional(),

  check("note")
    .notEmpty()
    .withMessage("note is required")
    .isLength({ min: 3 })
    .withMessage("note must be at least 3 characters"),

  check("report")
    .notEmpty()
    .withMessage("report ID is required")
    .isMongoId()
    .withMessage("Invalid report ID format"),

  validatorMiddleware,
];

// Get Obstacle Validator
exports.getObstacleValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid obstacle ID"),
  validatorMiddleware,
];

// Update Obstacle Validator
exports.updateObstacleValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid obstacle ID"),
  validatorMiddleware,
];

// Delete Obstacle Validator
exports.deleteObstacleValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid obstacle ID"),
  validatorMiddleware,
];
