const mongoose = require('mongoose');
const EtichetteSchema = require('./Etichetta');

const InformazioniSchema = new mongoose.Schema({
    titolo: String,
    descrizione: String,
    'etàMin': Number,
    'etàMax': Number,
    durataMin: Number,
    durataMax: Number,
    giocatoriMin: Number,
    giocatoriMax: Number,
    giocatoriPerSquadra: Number,
    giocatoriPerSquadraSet: Boolean,
    numeroSquadre: Number,
    numeroSquadreSet: Boolean,
    etichette: [EtichetteSchema]
});

module.exports = InformazioniSchema;