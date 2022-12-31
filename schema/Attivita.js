const mongoose = require('mongoose');
const InformazioniSchema = require('./Informazioni');
const CollegamentoSchema = require('./Collegamento');

const AttivitaSchema = new mongoose.Schema({
    banner: String,
    informazioni: InformazioniSchema,
    collegamenti: [CollegamentoSchema],
    ultimaModifica: Date,
    autore: {
        type: mongoose.Types.ObjectId,
        ref: 'Utenti',
        default: mongoose.Types.ObjectId('000000000000000000000000')
    },
    mediaValutazioni: Number,
    numeroSegnalazioni: Number
});

AttivitaSchema.index({ultimaModifica: -1});

module.exports = AttivitaSchema;
