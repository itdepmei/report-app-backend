const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getTodoValidator = [
    check('id').isMongoId().withMessage('Invalid todo id format'),
    validatorMiddleware,
  ];

exports.createTodoValidator = [
  check('title')
    .notEmpty()
    .withMessage('العنوان مطلوب')
    .isLength({ min: 3 })
    .withMessage('العنوان يجب أن يكون 3 أحرف على الأقل'),

  check('description')
    .notEmpty()
    .withMessage('الوصف مطلوب')
    .isLength({ min: 5 })
    .withMessage('الوصف يجب أن يكون 5 أحرف على الأقل'),

  check('isCompleted')
    .optional()
    .isBoolean()
    .withMessage('يجب أن تكون قيمة isCompleted صحيحة (true أو false)'),

  validatorMiddleware,
];

exports.updateTodoValidator = [
    check('id').isMongoId().withMessage('Invalid todo id format'),
    validatorMiddleware,
  ];
  
  exports.deleteTodoValidator = [
    check('id').isMongoId().withMessage('Invalid todo id format'),
    validatorMiddleware,
  ];