'use strict';

const jwt = require('jsonwebtoken');
const Utente = require('../models/Utente');
const dotenv = require('dotenv');
const utils = require('../utils/writer.js');
dotenv.config();

/**
 * Ottieni l'utente
 * Ottieni l'utente associato alla sessione corrente
 *
 * returns Utente
 **/
let getUtente = exports.getUtente = function(req) {
  return new Promise(function(resolve, reject) {
    // Ottengo Token
    const token = req.headers.authorization.replace(/^Bearer\s/, '');
    if (!token) {
      return reject(utils.respondWithCode(401, {
        "messaggio" : "Autenticazione necessaria per fare questa richiesta",
        "codice" : 401
      }));
    } 
    // Verifico Token
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
      if (err) {
        return reject(utils.respondWithCode(401, {
          "messaggio" : "Autenticazione non riuscita",
          "codice" : 401,
          "errore" : err
        }));
      }

      // Ottengo l'utente
      Utente.findById(decoded._id, function (err, utente) {
        // Se c'è un errore
        if (err) {
          return reject(utils.respondWithCode(500, {
            "messaggio" : "Errore interno",
            "codice" : 500,
            "errore" : err
          }));
        }
        // Se l'utente non esiste
        if (!utente) {
          return reject(utils.respondWithCode(401, {
            "messaggio" : "Autenticazione non riuscita",
            "codice" : 401,
            "errore" : {
              "message" : "Utente non trovato"
            }
          }));
        }
        // Se l'utente esiste
        resolve(utente);
      });
    });
  });
}


/**
 * Login con Google
 * Verifica il codice autorizzativo fornito da Google e crea un utente
 *
 * codiceAutorizzativo String Il codice autorizzativo fornito da Google
 * returns Utente
 **/
exports.loginGoogle = function(codiceAutorizzativo) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "ruolo" : "autenticato",
  "id" : 0,
  "email" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

/**
 * Ottieni gli utenti
 * Ottieni gli utenti iscritti all'applicativo
 *
 * returns List
 **/
 exports.getUtenti = function(req) {
  return new Promise(function(resolve, reject) {
    // Verifico che sia amministratore
    getUtente(req).then(async function(io) {
      try {
        // Se non è amministratore, restituisci 403
        if(io.ruolo != "amministratore") {
          return reject(utils.respondWithCode(403, {
            "messaggio" : "Non sei autorizzato a fare questa richiesta",
            "codice" : 403
          }));
        }

        // Trova tutti gli utenti
        var utenti = await Utente.find().exec();
        resolve(utenti);
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
 * Modifica il ruolo
 * Modifica il ruolo dell'utente con l'id specificato
 *
 * id Long L'id dell'utente
 * ruolo String Il nuovo ruolo dell'utente
 * returns Risposta
 **/
exports.modificaRuolo = function(req,ruolo,id) {
  return new Promise(async function(resolve, reject) {
    // Verifico che io sia amministratore
    getUtente(req).then(async function(io) {
      try {
        // Se non sono amministratore, restituisci 403
        if(io.ruolo != "amministratore") {
          return reject(utils.respondWithCode(403, {
            "messaggio" : "Non sei autorizzato a fare questa richiesta",
            "codice" : 403,
            "errore" : {
              "message" : "Devi essere amministratore per modificare il ruolo di un utente"
            }
          }));
        }
        // Se sto modificando il mio ruolo, restituisci 403
        if(io._id.toString() == id) {
          return reject(utils.respondWithCode(403, {
            "messaggio" : "Non sei autorizzato a fare questa richiesta",
            "codice" : 403,
            "errore" : {
              "message" : "Non puoi modificare il tuo ruolo"
            }
          }));
        }

        // Trova l'utente
        var utente = await Utente.findById(id).exec();

        // Se non esiste, restituisci 404
        if(!utente) {
          return reject(utils.respondWithCode(404, {
            "messaggio" : "Utente non trovato",
            "codice" : 404
          }));
        }
        
        if(utente.ruolo != "amministratore"){ // Promozione
          utente.ruolo = ruolo;
          utente.promossoDa = io._id;
          await utente.save();
          resolve({
            "messaggio" : "Ruolo modificato",
            "codice" : 200
          })
        } else { // Demozione
          // Cerca se sono il promotore di utente ricorsivamente
          var utenteTemp = utente;
          while(utenteTemp.promossoDa && // Se non è null
                !utenteTemp.promossoDa.equals(utenteTemp._id) && // Se non è uguale a sé stesso
                !utenteTemp.promossoDa.equals(io._id)) { // Se non sono io
            utenteTemp = await Utente.findById(utenteTemp.promossoDa).exec();
          }

          // Se non sono il promotore di utente, restituisci 403
          if(!utenteTemp.promossoDa.equals(io._id)) {
            return reject(utils.respondWithCode(403, {
              "messaggio" : "Non sei autorizzato a fare questa richiesta",
              "codice" : 403,
              "errore" : {
                "message" : "Non sei il promotore di questo utente"
              }
            }));
          }

          // Modifica il promotore di tutti i promossi da utente
          Utente.updateMany({promossoDa: utente._id}, {promossoDa: utente.promossoDa}).exec();
          
          // Modifica il ruolo di utente
          utente.promossoDa = io._id;
          utente.ruolo = ruolo;
          await utente.save();

          return resolve({
            "messaggio" : "Ruolo modificato",
            "codice" : 200
          })
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
