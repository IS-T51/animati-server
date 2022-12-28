const mongoose = require('mongoose');

const EtichettaSchema = new mongoose.Schema({
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

EtichettaSchema.index({nome: 1}, {unique: true});

module.exports = EtichettaSchema;