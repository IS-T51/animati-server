const mongoose = require('mongoose');
const EtichettaSchema = require.main.require('./schema/Etichetta');

mongoose.pluralize(null);

module.exports = new mongoose.model('Etichette', EtichettaSchema);
