'use strict';

const UtenteService = require('../service/UtenteService');
const Lista = require('../models/Lista');
const utils = require('../utils/writer.js');

/**
 * Aggiunge attività alla lista
 * Aggiunge l'attività specificata alla lista
 *
 * id Long L'id della lista
 * attivita Long L'id dell'attività da aggiungere alla lista
 * returns Lista
 **/
exports.aggiungiAttivitaALista = function(req, id,attivita) {
  console.log("id: " + id + " attivita: " + attivita);
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // Ottieni la lista
        var lista = await Lista.findById(id).exec();
        // Se non esiste, restituisci 404
        if(!lista) {
          return reject(utils.respondWithCode(404, {
            "messaggio" : "Lista non trovata",
            "codice" : 404
          }));
        }

        // Se non è l'autore, restituisci 403
        if(!lista.autore.equals(io._id)) {
          return reject(utils.respondWithCode(403, {
            "messaggio" : "Non sei autorizzato a fare questa richiesta",
            "codice" : 403,
            "errore" : {
              "message" : "Non sei l'autore della lista"
            }
          }));
        }

        // Aggiungi l'attività alla lista
        lista.attività.push(attivita);
        lista.ultimaModifica = new Date();
        lista.save();

        return resolve(lista);
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
 * Crea lista
 * Crea una nuova lista
 *
 * body Lista La lista da aggiungere
 * returns Lista
 **/
exports.aggiungiLista = function(req, body) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // Inserisci la lista
        var lista = await Lista.findOneAndUpdate(
          {nome: body.nome, autore: io._id},
          {nome: body.nome, autore: io._id, ultimaModifica: new Date()},
          {upsert: true, new: true, runValidators: true}
        ).exec();

        return resolve(lista);
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
 * Elimina lista
 * Elimina la lista con l'id specificato
 *
 * id Long L'id della lista
 * returns Risposta
 **/
exports.eliminaLista = function(req, id) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // Ottieni la lista
        var lista = await Lista.findById(id).exec();

        // Se non esiste, restituisci 404
        if(!lista) {
          return reject(utils.respondWithCode(404, {
            "messaggio" : "Lista non trovata",
            "codice" : 404
          }));
        }

        // Se non è l'autore, restituisci 403
        if(!lista.autore.equals(io._id)) {
          return reject(utils.respondWithCode(403, {
            "messaggio" : "Non sei autorizzato a fare questa richiesta",
            "codice" : 403,
            "errore" : {
              "message" : "Non sei l'autore della lista"
            }
          }));
        }

        // Elimina la lista
        lista.remove();

        return resolve({
          "messaggio" : "Lista eliminata",
          "codice" : 200
        });
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
 * Ottieni la lista
 * Ottieni la lista con l'id specificato
 *
 * id Long L'id della lista
 * returns Lista
 **/
exports.getLista = function(req, id) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // Ottieni la lista
        var lista = await Lista.findById(id).exec();

        // Se non esiste, restituisci 404
        if(!lista) {
          return reject(utils.respondWithCode(404, {
            "messaggio" : "Lista non trovata",
            "codice" : 404
          }));
        }

        // Se non è l'autore, restituisci 403
        if(!lista.autore.equals(io._id)) {
          return reject(utils.respondWithCode(403, {
            "messaggio" : "Non sei autorizzato a fare questa richiesta",
            "codice" : 403,
            "errore" : {
              "message" : "Non sei l'autore della lista"
            }
          }));
        }

        return resolve(lista);
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
 * Ottieni le liste
 * Ottieni le liste dell'utente
 *
 * returns Lista
 **/
exports.getListe = function(req) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // Ottieni la lista
        var liste = await Lista.find({autore: io._id}).exec();
        // Se ce ne sono, restituisci 200, altrimenti 204
        if(liste) {
          return resolve(liste);
        } else {
          resolve(utils.respondWithCode(204,{
            "messaggio" : "Nessuna lista trovata",
            "codice" : 204
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
 * Rimuovi attività dalla lista
 * Rimuove l'attività all'indice specificato dalla lista
 *
 * id Long L'id della lista
 * indice Long L'indice dell'attività da rimuovere dalla lista
 * returns Lista
 **/
exports.rimuoviAttivitaDaLista = function(req, id,indice) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // Ottieni la lista
        var lista = await Lista.findById(id).exec();

        // Se non esiste, restituisci 404
        if(!lista) {
          return reject(utils.respondWithCode(404, {
            "messaggio" : "Lista non trovata",
            "codice" : 404
          }));
        }

        // Se non è l'autore, restituisci 403
        if(!lista.autore.equals(io._id)) {
          return reject(utils.respondWithCode(403, {
            "messaggio" : "Non sei autorizzato a fare questa richiesta",
            "codice" : 403,
            "errore" : {
              "message" : "Non sei l'autore della lista"
            }
          }));
        }

        // Se l'indice è maggiore della lunghezza della lista, restituisci 400
        if(indice >= lista.attivita.length) {
          return reject(utils.respondWithCode(400, {
            "messaggio" : "Richiesta non valida",
            "codice" : 400,
            "errore" : {
              "message" : "L'indice specificato è maggiore della lunghezza della lista"
            }
          }));
        }

        // Rimuovi l'attività
        lista.attivita.splice(indice, 1);

        return resolve(lista);
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

