const mongoose = require('mongoose');

const IntervalloSchema = new mongoose.Schema({
    da: {
        type: Number,
        required: true
    },
    a: {
        type: Number,
        required: true
    }
});

module.exports = IntervalloSchema;