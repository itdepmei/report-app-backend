const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Create Suggestion Validator
exports.createSuggestionValidator = [
  check("timeStart").optional(),


  check("timeEnd").optional(),

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

// Get Suggestion Validator
exports.getSuggestionValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid suggestion ID"),
  validatorMiddleware,
];

// Update Suggestion Validator
exports.updateSuggestionValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid suggestion ID"),
  validatorMiddleware,
];

// Delete Suggestion Validator
exports.deleteSuggestionValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid suggestion ID"),
  validatorMiddleware,
];
