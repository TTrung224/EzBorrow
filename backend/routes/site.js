const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');

router.post('/login', accountController.login);
router.post('/register', accountController.register);
router.get('/', accountController.index);

module.exports = router;
