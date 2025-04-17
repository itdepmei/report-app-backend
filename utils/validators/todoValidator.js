const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Todo = require("../../models/todomodels");

exports.getTodoValidator = [
  check("id").isMongoId().withMessage("Invalid todo id format"),
  validatorMiddleware,
];

exports.createTodoValidator = [
  check("title")
    .notEmpty()
    .withMessage("العنوان مطلوب")
    .isLength({ min: 3 })
    .withMessage("العنوان يجب أن يكون 3 أحرف على الأقل"),

  check("description")
    .notEmpty()
    .withMessage("الوصف مطلوب")
    .isLength({ min: 5 })
    .withMessage("الوصف يجب أن يكون 5 أحرف على الأقل"),

  check("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("يجب أن تكون قيمة isCompleted صحيحة (true أو false)"),

  validatorMiddleware,
];

exports.updateTodoValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid todo id format")
    .custom((val, { req }) =>
      // Check todo ownership before update
      Todo.findById(val).then((todo) => {
        if (!todo) {
          return Promise.reject(new Error(`There is no todo with id ${val}`));
        }

        if (todo.user.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error(`Your are not allowed to perform this action`)
          );
        }
      })
    ),
  validatorMiddleware,
];

exports.deleteTodoValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid todo id format")
    .custom((val, { req }) => {
      // Check todo ownership before update
      if (req.user.role === "user") {
        return Todo.findById(val).then((todo) => {
          if (!todo) {
            return Promise.reject(
              new Error(`There is no review with id ${val}`)
            );
          }
          if (todo.user.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error(`Your are not allowed to perform this action`)
            );
          }
        });
      }
      return true;
    }),
  validatorMiddleware,
];
