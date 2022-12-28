const mongoose = require('mongoose');

const ValutazioneSchema = new mongoose.Schema({
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

ValutazioneSchema.index({'attività': 1, autore: 1}, {unique: true});

module.exports = ValutazioneSchema;
