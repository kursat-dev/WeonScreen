'use strict';

const router = require('express').Router();
const ctrl = require('../controllers/announcementsController');
const auth = require('../middleware/auth');
const v = require('../middleware/validate');
const { handleValidationErrors } = require('../middleware/errorHandler');

// Public
router.get('/active', ctrl.getActive);

// Admin
router.get('/', auth, ctrl.getAll);
router.post('/', auth, v.announcements.create, handleValidationErrors, ctrl.create);
router.put('/:id', auth, v.announcements.update, handleValidationErrors, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
