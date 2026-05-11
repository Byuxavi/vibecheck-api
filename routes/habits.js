const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits');
const { habitValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Rutas Públicas
router.get('/', habitsController.getAllHabits);
router.get('/:id', habitsController.getSingleHabit); // Ya no dará error

// Rutas Protegidas (OAuth + Validación)
router.post('/', isAuthenticated, habitValidationRules(), validate, habitsController.createHabit);
router.put('/:id', isAuthenticated, habitValidationRules(), validate, habitsController.updateHabit);
router.delete('/:id', isAuthenticated, habitsController.deleteHabit);

module.exports = router;