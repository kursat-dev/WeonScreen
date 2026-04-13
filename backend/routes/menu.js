'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/menuController');
const auth = require('../middleware/auth');
const v = require('../middleware/validate');
const { handleValidationErrors } = require('../middleware/errorHandler');

// Public
router.get('/today', ctrl.getToday);
router.get('/week', ctrl.getWeek);

// Admin
router.get('/', auth, ctrl.getAll);
router.post('/', auth, v.menu.create, handleValidationErrors, ctrl.create);
router.put('/:id', auth, v.menu.update, handleValidationErrors, ctrl.update);

module.exports = router;
