const express = require('express');
const router = express.Router();

// 1. Swagger (Rutas de documentación)
router.use('/', require('./swagger'));

// 2. Redirección automática: Cuando alguien entra a "/" lo mandamos a "/api-docs"
router.get('/', (req, res) => {
  // #swagger.ignore = true
  res.redirect('/api-docs');
});

// 3. Rutas de la API
router.use('/habits', require('./habits'));
// router.use('/users', require('./users')); 

module.exports = router;