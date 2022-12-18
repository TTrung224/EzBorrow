const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const verifyToken = require('../middleware/verifyToken');
const technician_auth = require('../middleware/technician_auth')

router.post('/login', accountController.login);
router.post('/register', accountController.register);
router.get('/getaccount', verifyToken, accountController.getUser);
router.get('/lecturers', verifyToken, accountController.getAllLecturer);
router.post('/logout', verifyToken, accountController.logout);
router.put('/setfine', technician_auth, accountController.setFine);
router.put('/resetfine', technician_auth, accountController.resetFine);

module.exports = router;
