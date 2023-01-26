const mongoose = require('mongoose');

const CollegamentoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

module.exports = CollegamentoSchema;