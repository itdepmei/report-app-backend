const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Create OutOfHoursWork Validator
exports.createOutOfHoursWorkValidator = [
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

// Get OutOfHoursWork Validator
exports.getOutOfHoursWorkValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid OutOfHoursWork ID"),
  validatorMiddleware,
];

// Update OutOfHoursWork Validator
exports.updateOutOfHoursWorkValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid OutOfHoursWork ID"),
  validatorMiddleware,
];

// Delete OutOfHoursWork Validator
exports.deleteOutOfHoursWorkValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid OutOfHoursWork ID"),
  validatorMiddleware,
];
