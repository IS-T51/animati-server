const mongoose = require('mongoose');
const ValutazioneSchema = require.main.require('./schema/Valutazione');

mongoose.pluralize(null);

module.exports = new mongoose.model('Valutazioni', ValutazioneSchema);
