const express = require('express');
const router = express.Router();

const expenseController = require('../controller/expense');

//api of expense 
router.post('/create', expenseController.create);
router.get('/detail/:id',expenseController.showdata);
router.get('/delete/:title',expenseController.destroy);

module.exports = router;