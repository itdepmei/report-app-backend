const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

// Create Complaints Validator
exports.createComplaintValidator = [
  check("timeStart").optional(),

  check("timeEnd").optional(),

  check("note")
    .notEmpty()
    .withMessage("Note is required")
    .isLength({ min: 3 })
    .withMessage("Note must be at least 3 characters"),

  check("report")
    .notEmpty()
    .withMessage("report ID is required")
    .isMongoId()
    .withMessage("Invalid report ID format"),

  validatorMiddleware,
];

// Get Complaint Validator
exports.getComplaintValidator = [
  check("id").isMongoId().withMessage("Invalid Complaint ID"),
  validatorMiddleware,
];

// Update Complaint Validator
exports.updateComplaintValidator = [
  check("id").isMongoId().withMessage("Invalid Complaint ID"),
  validatorMiddleware,
];

// Delete Complaint Validator
exports.deleteComplaintValidator = [
  check("id").isMongoId().withMessage("Invalid Complaint ID"),
  validatorMiddleware,
];
