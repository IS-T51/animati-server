const mongoose = require('mongoose');

const ListaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    autore: Number,
    'attività': [Number],
    ultimaModifica: Date
});

ListaSchema.index({nome: 1, autore: 1}, {unique: true});

module.exports = ListaSchema;