const mongoose = require('mongoose');
const EtichetteSchema = require('./Etichetta');
const IntervalloSchema = require('./Intervallo');

const InformazioniSchema = new mongoose.Schema({
    titolo: String,
    'età': IntervalloSchema,
    'unitàDurata': String,
    'durataMedia': Number,
    giocatori: IntervalloSchema,
    giocatoriPerSquadra: Number,
    giocatoriPerSquadraSet: Boolean,
    numeroSquadre: Number,
    numeroSquadreSet: Boolean,
    etichette: [EtichetteSchema]
});

module.exports = InformazioniSchema;