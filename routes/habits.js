const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits');
const { habitValidationRules, validate } = require('../middleware/validate');

// Para crear un hábito, primero validamos
router.post('/', habitValidationRules(), validate, habitsController.createHabit);

// Para actualizar, también validamos
router.put('/:id', habitValidationRules(), validate, habitsController.updateHabit);

router.get('/', habitsController.getAllHabits);
router.delete('/:id', habitsController.deleteHabit);

module.exports = router;