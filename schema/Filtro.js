const mongoose = require('mongoose');
const InformazioniSchema = require('./Informazioni');

const FiltroSchema = new mongoose.Schema({
    ...InformazioniSchema.obj,
    autore: {
        type: mongoose.ObjectId,
        ref: 'Utenti'
    },
    mediaMinima: Number,
    numeroSegnalazioniMinimo: Number,
    
});

module.exports = FiltroSchema;