const mongoose = require('mongoose');
const InformazioniSchema = require('./Informazioni');
const CollegamentoSchema = require('./Collegamento');

module.exports = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    descrizione: String,
    banner: String,
    informazioni: InformazioniSchema,
    collegamenti: [CollegamentoSchema],
    ultimaModifica: Date,
    mediaValutazioni: Number,
    numeroSegnalazioni: Number
});
