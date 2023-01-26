const mongoose = require('mongoose');
const UtenteSchema = require('../schema/Utente');

mongoose.pluralize(null);

module.exports = new mongoose.model('Utenti', UtenteSchema);
