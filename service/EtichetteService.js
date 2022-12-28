'use strict';


/**
 * Aggiungi etichetta
 * Aggiunge l'etichetta specificata
 *
 * body Etichetta L'etichetta da aggiungere
 * returns Etichetta
 **/
exports.aggiungiEtichetta = function (body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "descrizione": "descrizione",
      "categoria": "categoria",
      "nome": "nome"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Ottieni tutte le etichette
 * Ottiene tutte le etichette
 *
 * returns List
 **/
exports.ottieniEtichette = function () {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
      "descrizione": "descrizione",
      "categoria": "categoria",
      "nome": "nome"
    }, {
      "descrizione": "descrizione",
      "categoria": "categoria",
      "nome": "nome"
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}