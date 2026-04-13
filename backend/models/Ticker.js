'use strict';

const mongoose = require('mongoose');

const tickerSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Map _id to id for frontend compatibility
tickerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

tickerSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('Ticker', tickerSchema);
