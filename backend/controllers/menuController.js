'use strict';

const Menu = require('../models/Menu');

/** GET /api/menu/today — Public */
async function getToday(req, res, next) {
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);

        const row = await Menu.findOne({
            date: { $gte: start, $lte: end }
        });
        res.json(row || null);
    } catch (err) {
        next(err);
    }
}

/** GET /api/menu/week — Public (full-week view for display / admin) */
async function getWeek(req, res, next) {
    try {
        const today = new Date();
        const monday = new Date(today);
        monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
        monday.setHours(0, 0, 0, 0);

        const nextMonday = new Date(monday);
        nextMonday.setDate(monday.getDate() + 7);

        const rows = await Menu.find({
            date: { $gte: monday, $lt: nextMonday }
        }).sort({ date: 1 });
        res.json(rows);
    } catch (err) {
        next(err);
    }
}

/** GET /api/menu — Admin */
async function getAll(req, res, next) {
    try {
        const rows = await Menu.find().sort({ date: -1 });
        res.json(rows);
    } catch (err) {
        next(err);
    }
}

/** POST /api/menu — Admin */
async function create(req, res, next) {
    try {
        const { date, soup, main_course, side_dish, dessert } = req.body;
        const row = await Menu.create({ date, soup, main_course, side_dish, dessert });
        res.status(201).json(row);
    } catch (err) {
        next(err);
    }
}

/** PUT /api/menu/:id — Admin */
async function update(req, res, next) {
    try {
        const { id } = req.params;
        const row = await Menu.findByIdAndUpdate(id, req.body, { new: true });
        if (!row) return res.status(404).json({ error: 'Menu entry not found.' });
        res.json(row);
    } catch (err) {
        next(err);
    }
}

module.exports = { getToday, getWeek, getAll, create, update };
