const mongoose = require('mongoose');

const ListaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    autore: String,
    'attività': [
        {
            type: mongoose.ObjectId,
            ref: 'Catalogo',
        }
    ],
    ultimaModifica: Date
});

ListaSchema.index({nome: 1, autore: 1}, {unique: true});

module.exports = ListaSchema;