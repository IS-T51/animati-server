'use strict';

var utils = require('../utils/writer.js');
const Etichetta = require('../models/Etichetta');
const UtenteService = require('./UtenteService');

/**
 * Aggiungi etichetta
 * Aggiunge l'etichetta specificata
 *
 * body Etichetta L'etichetta da aggiungere
 * returns Etichetta
 **/
exports.aggiungiEtichetta = function(req, body) {                     // i 400 dati da swagger.yaml sono già gestiti (compreso numero sbagliato parametri)
  return new Promise(async function(resolve, reject) {
    // Verifico che sia amministratore
    UtenteService.getUtente(req).then(async function(io) {            // 401 lo fa il getUtente con reject(response)
      try {
        // Se non è amministratore, restituisci 403
        if(io.ruolo != "amministratore") {
          return reject(utils.respondWithCode(403, {
            "messaggio" : "Non sei autorizzato a fare questa richiesta",
            "codice" : 403
          }));
        }

        // Aggiorna o inserisci l'etichetta
        var etichetta = await Etichetta.findOneAndUpdate(
          {nome: body.nome},
          body,
          {upsert: true, new: false, setDefaultsOnInsert: true}
        ).exec();
        // Se c'è già, restituisci 200, altrimenti 201
        if(etichetta) {
          return resolve({
            "messaggio" : "Etichetta aggiornata",
            "codice" : 200
          });
        } else {
          return resolve(utils.respondWithCode(201, {
            "messaggio" : "Etichetta aggiunta",
            "codice" : 201
          }));
        }
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio" : "Errore interno",
          "codice" : 500,
          "errore" : err
        }));
      }
    }).catch(function(response) {
      // Errore autenticazione
      return reject(response);
    });
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
      // Trova tutte le etichette
      var etichette = await Etichetta.find().exec();
      // Se ce ne sono, restituisci 200, altrimenti 204
      if(etichette) {
        resolve(etichette);
      } else {
        resolve(utils.respondWithCode(204,{
          "messaggio" : "Nessuna etichetta trovata",
          "codice" : 204
        }));
      }
    } catch (err) {
      reject(utils.respondWithCode(500,{
        "messaggio" : "Errore interno",
        "codice" : 500,
        "errore" : err
      }));
    }
  });
}

