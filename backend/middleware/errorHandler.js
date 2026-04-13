'use strict';

const { validationResult } = require('express-validator');

/**
 * Runs after express-validator chains.
 * If there are validation errors, returns 422 with the details.
 */
function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}

/**
 * Centralized error handler.
 * Must be registered LAST in the Express middleware chain.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    console.error('[Error]', err);

    // PostgreSQL unique violation
    if (err.code === '23505') {
        return res.status(409).json({ error: 'A record with that value already exists.' });
    }

    // PostgreSQL foreign key violation
    if (err.code === '23503') {
        return res.status(409).json({ error: 'Related record not found.' });
    }

    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
}

module.exports = { handleValidationErrors, errorHandler };
