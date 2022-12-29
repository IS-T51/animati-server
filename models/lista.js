const mongoose = require('mongoose');
const ListaSchema = require.main.require('./schema/Lista');

mongoose.pluralize(null);

module.exports = new mongoose.model('Liste', ListaSchema);
