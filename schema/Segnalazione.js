const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    messaggio: {
        type: String,
        required: true
    },
    titolo: {
        type: String,
        required: true
    },
    'attività': {
        type: Number,
        required: true
    },
    autore: {
        type: Number,
        required: true
    }
});