const { body, validationResult } = require('express-validator');

const habitValidationRules = () => {
  return [
    body('title').trim().notEmpty().withMessage('Title is required.'),
    body('category').trim().notEmpty().withMessage('Category is required.'),
    body('goalValue').isNumeric().withMessage('Goal value must be a number.'),
    body('startDate').isISO8601().withMessage('Must be a valid date (YYYY-MM-DD).'),
    body('userId').notEmpty().withMessage('User ID is required.')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  habitValidationRules,
  validate,
};