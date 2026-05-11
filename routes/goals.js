const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goals');
const { goalValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Rutas Públicas
router.get('/', goalsController.getAll);
router.get('/:id', goalsController.getSingle);

// Rutas Protegidas (Requieren Login + Validación de datos)
router.post('/', isAuthenticated, goalValidationRules(), validate, goalsController.create);
router.put('/:id', isAuthenticated, goalValidationRules(), validate, goalsController.update);
router.delete('/:id', isAuthenticated, goalsController.deleteItem);

module.exports = router;