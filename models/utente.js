const mongoose = require('mongoose');
const UtenteSchema = require('../schema/Utente');

module.exports = new mongoose.model('Utenti', UtenteSchema);
