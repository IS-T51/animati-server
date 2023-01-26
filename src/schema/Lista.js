const mongoose = require('mongoose');

const ListaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    autore: {
        type: mongoose.Types.ObjectId,
        ref: 'Utenti',
        required: true
    },
    'attività': {
        type: [mongoose.Types.ObjectId],
        ref: 'Catalogo',
        default: []
    },
    ultimaModifica: {
        type: Date,
        default: Date.now
    }
});

ListaSchema.index({nome: 1, autore: 1}, {unique: true});

module.exports = ListaSchema;