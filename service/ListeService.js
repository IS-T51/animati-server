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
exports.aggiungiAttivitaALista = function (req, attivita, id) {
  return new Promise(async function (resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function (io) {
      try {
        // Ottieni la lista
        var lista = await Lista.findById(id).exec();
        // Se non esiste, restituisci 404
        if (!lista) {
          return reject(utils.respondWithCode(404, {
            "messaggio": "Lista non trovata",
            "codice": 404
          }));
        }

        // Se non è l'autore, restituisci 403
        if (!lista.autore.equals(io._id)) {
          return reject(utils.respondWithCode(403, {
            "messaggio": "Non sei autorizzato a fare questa richiesta",
            "codice": 403,
            "errore": {
              "message": "Non sei l'autore della lista"
            }
          }));
        }

        if (lista.attività.length >= 9999) {
          return reject(utils.respondWithCode(400, {
            "messaggio": "Richiesta non valida",
            "codice": 400,
            "errore": {
              "message": "Questa lista ha raggiunto la capacità massima, non puoi aggiungere altri elementi"
            }
          }));
        }

        // Aggiungi l'attività alla lista
        lista.attività.push(attivita);
        lista.ultimaModifica = new Date();
        await lista.save();

        return resolve(utils.respondWithCode(201, {
          "messaggio": "Attività aggiunta",
          "codice": 201,
          "lista": lista
        }));
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio": "Errore interno",
          "codice": 500,
          "errore": err
        }));
      }
    }).catch(function (response) {
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
exports.aggiungiLista = function (req, body) {
  return new Promise(async function (resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function (io) {
      try {
        // conta le liste dell'utente, se sono già 99 restituisci 400
        var totale = await Lista.countDocuments(
          { autore: io._id }
        ).exec();

        if(totale >= 99){
          return reject(utils.respondWithCode(400, {
            "messaggio": "Richiesta non valida",
            "codice": 400,
            "errore": {
              "message": "Hai raggiunto la quantità massima di liste"
            }
          }));
        }

        // Controlla se la lista esiste già, e in caso restituisci 400
        var lista = await Lista.findOne(
          { nome: body.nome, autore: io._id}
        ).exec();

        if(lista){
          return reject(utils.respondWithCode(400, {
            "messaggio": "Richiesta non valida",
            "codice": 400,
            "errore": {
              "message": "Hai già una lista con questo nome"
            }
          }));
        }

        // Inserisci la lista
        lista = await Lista.findOneAndUpdate(
          { nome: body.nome, autore: io._id },
          { nome: body.nome, autore: io._id, ultimaModifica: new Date() },
          { upsert: true, new: true, runValidators: true }
        ).exec();

        return resolve(utils.respondWithCode(201, {
          "messaggio": "Lista creata",
          "codice": 201,
          "lista": lista
        }));
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio": "Errore interno",
          "codice": 500,
          "errore": err
        }));
      }
    }).catch(function (response) {
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
exports.eliminaLista = function (req, id) {
  return new Promise(async function (resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function (io) {
      try {
        // Ottieni la lista
        var lista = await Lista.findById(id).exec();

        // Se non esiste, restituisci 404
        if (!lista) {
          return reject(utils.respondWithCode(404, {
            "messaggio": "Lista non trovata",
            "codice": 404
          }));
        }

        // Se non è l'autore, restituisci 403
        if (!lista.autore.equals(io._id)) {
          return reject(utils.respondWithCode(403, {
            "messaggio": "Non sei autorizzato a fare questa richiesta",
            "codice": 403,
            "errore": {
              "message": "Non sei l'autore della lista"
            }
          }));
        }

        //non eliminare preferiti
        if (lista._id.equals(io._id)) {
          return reject(utils.respondWithCode(400, {
            "messaggio": "Richiesta invalida",
            "codice": 400,
            "errore": {
              "message": "Non si può eliminare la lista preferiti"
            }
          }));
        }

        // Elimina la lista
        await lista.remove();

        return resolve({
          "messaggio": "Lista eliminata",
          "codice": 200
        });
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio": "Errore interno",
          "codice": 500,
          "errore": err
        }));
      }
    }).catch(function (response) {
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
exports.getLista = function (req, id) {
  return new Promise(async function (resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function (io) {
      try {
        // Ottieni la lista
        var lista = await Lista.findById(id).exec();

        // Se non esiste, restituisci 404
        if (!lista) {
          return reject(utils.respondWithCode(404, {
            "messaggio": "Lista non trovata",
            "codice": 404
          }));
        }

        // Se non è l'autore, restituisci 403
        if (!lista.autore.equals(io._id)) {
          return reject(utils.respondWithCode(403, {
            "messaggio": "Non sei autorizzato a fare questa richiesta",
            "codice": 403,
            "errore": {
              "message": "Non sei l'autore della lista"
            }
          }));
        }

        return resolve(lista);
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio": "Errore interno",
          "codice": 500,
          "errore": err
        }));
      }
    }).catch(function (response) {
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
exports.getListe = function (req) {
  return new Promise(async function (resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function (io) {
      try {
        // Ottieni la lista
        var liste = await Lista.find({ autore: io._id }).exec();
        // Se ce ne sono, restituisci 200, altrimenti ... c'è almeno Preferiti quindi no 204
        return resolve(liste);

      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio": "Errore interno",
          "codice": 500,
          "errore": err
        }));
      }
    }).catch(function (response) {
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
exports.rimuoviAttivitaDaLista = function (req, id, indice) {
  return new Promise(async function (resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function (io) {
      try {
        // Ottieni la lista
        var lista = await Lista.findById(id).exec();

        //console.log("here1");

        // Se non esiste, restituisci 404
        if (!lista) {
          return reject(utils.respondWithCode(404, {
            "messaggio": "Lista non trovata",
            "codice": 404
          }));
        }

        // Se non è l'autore, restituisci 403
        if (!lista.autore.equals(io._id)) {
          return reject(utils.respondWithCode(403, {
            "messaggio": "Non sei autorizzato a fare questa richiesta",
            "codice": 403,
            "errore": {
              "message": "Non sei l'autore della lista"
            }
          }));
        }

        // Se l'indice è maggiore della lunghezza della lista, restituisci 400
        if (indice >= lista.attività.length) {
          return reject(utils.respondWithCode(400, {
            "messaggio": "Richiesta non valida",
            "codice": 400,
            "errore": {
              "message": "L'indice specificato è maggiore della lunghezza della lista"
            }
          }));
        }

        // Rimuovi l'attività
        lista.attività.splice(indice, 1);
        lista.ultimaModifica = new Date();
        await lista.save();

        return resolve(lista);
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio": "Errore interno",
          "codice": 500,
          "errore": err
        }));
      }
    }).catch(function (response) {
      // Errore autenticazione
      return reject(response);
    });
  });
}

