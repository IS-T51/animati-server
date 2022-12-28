const mongoose = require('mongoose');
const ListaSchema = require('../schema/Lista');

module.exports = new mongoose.model('Liste', ListaSchema);
