const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');

router.post('/', componentController.create);
router.put('/:id', componentController.update);
router.delete('/:id', componentController.delete);
router.get('/:id', componentController.getOne);

router.get('/', componentController.getAll);

module.exports = router;