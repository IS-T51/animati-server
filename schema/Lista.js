const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    autore: Number,
    'attività': [Number],
    ultimaModifica: Date
});