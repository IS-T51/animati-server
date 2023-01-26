const mongoose = require('mongoose');
const ListaSchema = require('../schema/Lista');

mongoose.pluralize(null);

module.exports = new mongoose.model('Liste', ListaSchema);
