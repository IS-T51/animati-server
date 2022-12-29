const mongoose = require('mongoose');
const ValutazioneSchema = require('../schema/Valutazione');

mongoose.pluralize(null);

module.exports = new mongoose.model('Valutazioni', ValutazioneSchema);
