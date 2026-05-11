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

const userValidationRules = () => {
  return [
    body('firstName').trim().notEmpty().withMessage('First name is required.'),
    body('lastName').trim().notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().withMessage('Please enter a valid email.'),
    body('favoriteColor').optional().trim()
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


const goalValidationRules = () => {
  return [
    body('title').trim().notEmpty().withMessage('Goal title is required.'),
    body('targetDate').isISO8601().withMessage('Must be a valid date (YYYY-MM-DD).')
  ];
};

const reminderValidationRules = () => {
  return [
    body('message').trim().notEmpty().withMessage('Reminder message is required.'),
    body('reminderTime').notEmpty().withMessage('Reminder time is required.')
  ];
};

// ACTUALIZA TU EXPORTACIÓN
module.exports = {
  habitValidationRules,
  userValidationRules,
  goalValidationRules,     
  reminderValidationRules, 
  validate,
};