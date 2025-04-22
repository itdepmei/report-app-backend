const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Create Report Validator
exports.createReportValidator = [
  check("date")
    .notEmpty()
    .withMessage("data field is required")
    .isISO8601()
    .withMessage("data must be a valid date"),
  validatorMiddleware,
];

// Get Report Validator
exports.getReportValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid report ID"),
  validatorMiddleware,
];

// Update Report Validator
exports.updateReportValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid report ID"),
  validatorMiddleware,
];

// Delete Report Validator
exports.deleteReportValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid report ID"),
  validatorMiddleware,
];
