const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const verifyToken = require('../middleware/auth');


router.post('/', requestController.create);
router.get('/:id', requestController.getOne);
router.put('/:id', verifyToken, requestController.update); 
// req.body.type = "approve" / "cancel" / "pickUp" / "return" & (token to define user type)

router.get('/', requestController.getAll);

module.exports = router;