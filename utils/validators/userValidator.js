const bcrypt = require("bcrypt");

const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require("../../models/userModel");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name is required")
    .isLength({ min: 3 })
    .withMessage("User name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("User name must be at most 32 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already exists"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("User password is required")
    .isLength({ min: 6 })
    .withMessage("User password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("passwordConfirm")
    .notEmpty()
    .withMessage("User passwordConfirm is required"),
  check("profileImg").optional(),
  check("role").optional(),
  check("phone").optional(),
  // .isMobilePhone(["ar-IQ", "ar-EG"])
  // .withMessage("Invalid phone number"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("User email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already exists"));
        }
      })
    ),
  check("profileImg").optional(),
  check("role").optional(),
  check("phone").optional(),
  // .isMobilePhone(["ar-IQ", "ar-EG"])
  // .withMessage("Invalid phone number")
  validatorMiddleware,
];
exports.updateLoggedUserValidator = [
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email format")
    .custom((val, { req }) => {
      if (!val) return true;

      return User.findOne({ email: val }).then((user) => {
        if (user && user.id !== req.user._id.toString()) {
          // 🔹 السماح بنفس البريد إذا كان للمستخدم نفسه فقط
          return Promise.reject(new Error("Email already exists"));
        }
      });
    }),

  validatorMiddleware,
];

exports.changeUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("passwordConfirm").notEmpty().withMessage("PasswordConfirm is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (val, { req }) => {
      // 1) verify current password
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error("User not found");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Current password is incorrect");
      }

      // 2) verify passwordConfirm
      if (val !== req.body.passwordConfirm) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  validatorMiddleware,
];
