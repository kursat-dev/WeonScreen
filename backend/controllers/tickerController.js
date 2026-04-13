'use strict';

const Ticker = require('../models/Ticker');

/** GET /api/ticker/active — Public */
async function getActive(req, res, next) {
    try {
        const rows = await Ticker.find({ is_active: true }).sort({ created_at: 1 });
        res.json(rows);
    } catch (err) {
        next(err);
    }
}

/** GET /api/ticker — Admin */
async function getAll(req, res, next) {
    try {
        const rows = await Ticker.find().sort({ created_at: 1 });
        res.json(rows);
    } catch (err) {
        next(err);
    }
}

/** POST /api/ticker — Admin */
async function create(req, res, next) {
    try {
        const { message, is_active } = req.body;
        const row = await Ticker.create({ message, is_active });
        res.status(201).json(row);
    } catch (err) {
        next(err);
    }
}

/** PUT /api/ticker/:id — Admin */
async function update(req, res, next) {
    try {
        const { id } = req.params;
        const row = await Ticker.findByIdAndUpdate(id, req.body, { new: true });
        if (!row) return res.status(404).json({ error: 'Ticker message not found.' });
        res.json(row);
    } catch (err) {
        next(err);
    }
}

/** DELETE /api/ticker/:id — Admin */
async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const row = await Ticker.findByIdAndDelete(id);
        if (!row) return res.status(404).json({ error: 'Ticker message not found.' });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

module.exports = { getActive, getAll, create, update, remove };
