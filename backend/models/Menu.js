'use strict';

const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    soup: {
        type: String,
        default: null
    },
    main_course: {
        type: String,
        default: null
    },
    side_dish: {
        type: String,
        default: null
    },
    dessert: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Map _id to id for frontend compatibility
menuSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

menuSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Menu', menuSchema);
