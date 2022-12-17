const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');
const technician_auth = require('../middleware/technician_auth');
const verifyToken = require('../middleware/verifyToken');

router.post('/', technician_auth, componentController.create);
router.put('/:id', technician_auth,componentController.update); // req.body = {updateBorrowed, updateComponent}
router.delete('/:id', technician_auth, componentController.delete);
router.get('/search', verifyToken, componentController.getByName);// ?name=
router.get('/:id', verifyToken, componentController.getOne);

router.get('/', verifyToken, componentController.getAll);

module.exports = router;