const mongoose = require('mongoose');
const UtenteSchema = require.main.require('./schema/Utente');

mongoose.pluralize(null);

module.exports = new mongoose.model('Utenti', UtenteSchema);
