const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');

router.post('/', componentController.create);
router.put('/:id', componentController.update);
router.delete('/:id', componentController.delete);

router.get('/', componentController.index);

module.exports = router;