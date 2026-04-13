'use strict';

const jwt = require('jsonwebtoken');

/**
 * JWT authentication middleware.
 * Expects: Authorization: Bearer <token>
 */
function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required. No token provided.' });
    }

    const token = authHeader.slice(7);
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // { id, username, role }
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired. Please log in again.' });
        }
        return res.status(401).json({ error: 'Invalid token.' });
    }
}

module.exports = auth;
