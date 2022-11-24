const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const verifyToken = require('../middleware/auth');

router.post('/login', accountController.login);
router.post('/register', accountController.register);
router.get('/main', verifyToken, accountController.index);

module.exports = router;
