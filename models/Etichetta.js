const mongoose = require('mongoose');
const EtichettaSchema = require('../schema/Etichetta');

module.exports = new mongoose.model('Etichette', EtichettaSchema);
