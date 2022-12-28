const mongoose = require('mongoose');
const EtichettaSchema = require('../schema/Etichetta');

mongoose.pluralize(null);

module.exports = new mongoose.model('Etichette', EtichettaSchema);
