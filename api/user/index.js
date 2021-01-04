const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

// GET
router.get('/', ctrl.index);

// GET
router.get('/:id', ctrl.show);

// DELETE
router.delete('/:id', ctrl.destroy);

// POST
router.post('/', ctrl.create);

// PUT
router.put('/:id', ctrl.update);

module.exports = router;