const express = require('express');
const router = express.Router();

//common router
router.use('/user', require('./user'));
router.use('/expense', require('./expense'));

module.exports = router;