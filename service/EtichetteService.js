'use strict';

var utils = require('../utils/writer.js');
const Etichetta = require('../models/Etichetta');

/**
 * Aggiungi etichetta
 * Aggiunge l'etichetta specificata
 *
 * body Etichetta L'etichetta da aggiungere
 * returns Etichetta
 **/
exports.aggiungiEtichetta = function(body) {
  return new Promise(async function(resolve, reject) {
    try {
      // Aggiorna o inserisci l'etichetta
      var etichetta = await Etichetta.findOneAndUpdate(
        {nome: body.nome},
        body,
        {upsert: true, new: false, setDefaultsOnInsert: true}
      ).exec();
      // Se c'è già, restituisci 200, altrimenti 201
      if(etichetta) {
        resolve({
          "messaggio" : "Etichetta aggiornata",
          "codice" : 200
        });
      } else {
        resolve(utils.respondWithCode(201, {
          "messaggio" : "Etichetta aggiunta",
          "codice" : 201
        }));
      }
    } catch (err) {
      reject(utils.respondWithCode(500, err));
    }
  });
}


/**
 * Ottieni tutte le etichette
 * Ottiene tutte le etichette
 *
 * returns List
 **/
exports.ottieniEtichette = function() {
  return new Promise(async function(resolve, reject) {
    try {
      // Aggiorna o inserisci l'etichetta
      var etichette = await Etichetta.find().exec();
      // Se ce ne sono, restituisci 200, altrimenti 204
      if(etichette) {
        resolve(etichette, 200);
      } else {
        resolve({
          "messaggio" : "Nessuna etichetta trovata",
          "codice" : 204
        }, 204);
      }
    } catch (err) {
      reject(err, 500);
    }
  });
}

