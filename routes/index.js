const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/habits', require('./habits'));
// router.use('/users', require('./users')); // Lo haremos después

module.exports = router;