const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const verifyToken = require('../middleware/verifyToken');

router.post('/login', accountController.login);
router.post('/register', accountController.register);
router.get('/getAccount', verifyToken, accountController.getUser);
router.post('/logout', verifyToken, accountController.logout);
router.put('/setFine', technician_auth, accountController.setFine);
router.put('/resetFine', technician_auth, accountController.resetFine);

module.exports = router;
