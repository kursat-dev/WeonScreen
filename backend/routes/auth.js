'use strict';

const router = require('express').Router();
const { login } = require('../controllers/authController');
const v = require('../middleware/validate');
const { handleValidationErrors } = require('../middleware/errorHandler');

router.post('/login', v.auth.login, handleValidationErrors, login);

module.exports = router;
