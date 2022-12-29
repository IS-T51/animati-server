const mongoose = require('mongoose');
const SegnalazioneSchema = require.main.require('./schema/Segnalazione');

mongoose.pluralize(null);

module.exports = new mongoose.model('Segnalazioni', SegnalazioneSchema);
