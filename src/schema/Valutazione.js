const mongoose = require('mongoose');

const ValutazioneSchema = new mongoose.Schema({
    voto: {
        type: Number,
        required: true
    },
    'attività': {
        type: mongoose.ObjectId,
        ref: 'Catalogo',
        required: true
    },
    autore: {
        type: mongoose.ObjectId,
        ref: 'Utenti',
        required: true
    }
});

ValutazioneSchema.index({'attività': 1, autore: 1}, {unique: true});

module.exports = ValutazioneSchema;
