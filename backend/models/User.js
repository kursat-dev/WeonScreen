'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password_hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Map _id to id for frontend compatibility
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

module.exports = mongoose.model('User', userSchema);
