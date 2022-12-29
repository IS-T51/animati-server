const mongoose = require('mongoose');
const AttivitaSchema = require('../schema/Attivita');

mongoose.pluralize(null);

module.exports = new mongoose.model('Catalogo', AttivitaSchema);
