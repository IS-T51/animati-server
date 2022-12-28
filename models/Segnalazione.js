const mongoose = require('mongoose');
const SegnalazioneSchema = require('../schema/Segnalazione');

module.exports = new mongoose.model('Segnalazioni', SegnalazioneSchema);
