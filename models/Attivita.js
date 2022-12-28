const mongoose = require('mongoose');
const AttivitaSchema = require('../schema/Attivita');

module.exports = new mongoose.model('Catalogo', AttivitaSchema);
