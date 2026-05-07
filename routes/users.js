const router = require('express').Router();
const usersController = require('../controllers/users');
const { userValidationRules, validate } = require('../middleware/validate');

// Rutas GET
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getSingleUser);

// Ruta POST (Crear)
router.post('/', userValidationRules(), validate, usersController.createUser);

// Ruta PUT (Actualizar)
router.put('/:id', userValidationRules(), validate, usersController.updateUser);

// Ruta DELETE (Eliminar)
router.delete('/:id', usersController.deleteUser);

module.exports = router;