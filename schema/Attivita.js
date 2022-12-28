const mongoose = require('mongoose');
const InformazioniSchema = require('./Informazioni');
const CollegamentoSchema = require('./Collegamento');

const AttivitaSchema = new mongoose.Schema({
    descrizione: String,
    banner: String,
    informazioni: InformazioniSchema,
    collegamenti: [CollegamentoSchema],
    ultimaModifica: Date,
    mediaValutazioni: Number,
    numeroSegnalazioni: Number
});

AttivitaSchema.index({ultimaModifica: -1});

module.exports = AttivitaSchema;
