const express = require('express');
const router = express.Router();
const remindersController = require('../controllers/reminders');
const { reminderValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Rutas Públicas
router.get('/', remindersController.getAll);
router.get('/:id', remindersController.getSingle);

// Rutas Protegidas
router.post('/', isAuthenticated, reminderValidationRules(), validate, remindersController.create);
router.put('/:id', isAuthenticated, reminderValidationRules(), validate, remindersController.update);
router.delete('/:id', isAuthenticated, remindersController.deleteItem);

module.exports = router;