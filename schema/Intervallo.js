const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    da: {
        type: Number,
        required: true
    },
    a: {
        type: Number,
        required: true
    }
});