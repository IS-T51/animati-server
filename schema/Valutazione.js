const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    voto: {
        type: Number,
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