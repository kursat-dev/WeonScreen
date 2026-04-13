'use strict';

const Announcement = require('../models/Announcement');

/** GET /api/announcements/active — Public */
async function getActive(req, res, next) {
    try {
        const rows = await Announcement.find({ is_active: true }).sort({ created_at: -1 });
        res.json(rows);
    } catch (err) {
        next(err);
    }
}

/** GET /api/announcements — Admin */
async function getAll(req, res, next) {
    try {
        const rows = await Announcement.find().sort({ created_at: -1 });
        res.json(rows);
    } catch (err) {
        next(err);
    }
}

/** POST /api/announcements — Admin */
async function create(req, res, next) {
    try {
        const { title, content, image_url, is_active } = req.body;
        const row = await Announcement.create({ title, content, image_url, is_active });
        res.status(201).json(row);
    } catch (err) {
        next(err);
    }
}

/** PUT /api/announcements/:id — Admin */
async function update(req, res, next) {
    try {
        const { id } = req.params;
        const row = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
        if (!row) return res.status(404).json({ error: 'Announcement not found.' });
        res.json(row);
    } catch (err) {
        next(err);
    }
}

/** DELETE /api/announcements/:id — Admin */
async function remove(req, res, next) {
    try {
        const { id } = req.params;
        const row = await Announcement.findByIdAndDelete(id);
        if (!row) return res.status(404).json({ error: 'Announcement not found.' });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

module.exports = { getActive, getAll, create, update, remove };
