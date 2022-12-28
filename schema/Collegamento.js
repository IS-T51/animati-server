const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});