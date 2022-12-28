const mongoose = require('mongoose');
const ValutazioneSchema = require('../schema/Valutazione');

module.exports = new mongoose.model('Valutazioni', ValutazioneSchema);
