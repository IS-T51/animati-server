const mongoose = require('mongoose');
const EtichetteSchema = require('./Etichetta');
const IntervalloSchema = require('./Intervallo');

module.exports = new mongoose.Schema({
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