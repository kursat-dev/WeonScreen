'use strict';

const Event = require('../models/Event');

/** GET /api/events/active — Public */
async function getActive(req, res, next) {
    try {
        const rows = await Event.find({ is_active: true }).sort({ created_at: -1 });
        res.json(rows);
    } catch (err) {
        next(err);
    }
}

/** GET /api/events — Admin */
async function getAll(req, res, next) {
    try {
        const rows = await Event.find().sort({ created_at: -1 });
        res.json(rows);
    } catch (err) {
        next(err);
    }
}

/** POST /api/events — Admin */
async function create(req, res, next) {
    try {
        const { title, description, media_url, media_type, is_active } = req.body;
        const row = await Event.create({ title, description, media_url, media_type, is_active });
        res.status(201).json(row);
    } catch (err) {
        next(err);
    }
}

/** PUT /api/events/:id — Admin */
async function update(req, res, next) {
    try {
        const { id } = req.params;
        const row = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!row) return res.status(404).json({ error: 'Event not found.' });
        res.json(row);
    } catch (err) {
        next(err);
    }
}

/** DELETE /api/events/:id — Admin */
async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const row = await Event.findByIdAndDelete(id);
        if (!row) return res.status(404).json({ error: 'Event not found.' });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

module.exports = { getActive, getAll, create, update, remove };
