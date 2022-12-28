const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descrizione: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
});