const mongoose = require('mongoose');

const SegnalazioneSchema = new mongoose.Schema({
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

SegnalazioneSchema.index({titolo: 1, 'attività': 1, autore: 1}, {unique: true});

module.exports = SegnalazioneSchema;