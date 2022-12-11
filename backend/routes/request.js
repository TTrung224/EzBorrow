const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const verifyToken = require('../middleware/verifyToken');
const technician_auth = require('../middleware/technician_auth');

router.get('/myrequest', verifyToken, requestController.getMyRequest);
router.get('/search', technician_auth, requestController.getByBorrower);// ?email=
router.get('/:id', verifyToken,requestController.getOne);
router.get('/',technician_auth, requestController.getAll);

router.post('/', verifyToken, requestController.create);
router.put('/', verifyToken, requestController.update); 
// req.body.type = "approve" / "cancel" / "pickUp" / "return" & (token to define user type)

module.exports = router;
