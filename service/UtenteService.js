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
exports.getUtente = function(req) {
  return new Promise(function(resolve, reject) {
    // Ottengo Token
    const token = req.headers.authorization.replace(/^Bearer\s/, '');
    if (!token) {
      reject(utils.respondWithCode(401, {
        "messaggio" : "Autenticazione necessaria per fare questa richiesta",
        "codice" : 401
      }));
      return;
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
 * Modifica il ruolo
 * Modifica il ruolo dell'utente con l'id specificato
 *
 * id Long L'id dell'utente
 * ruolo String Il nuovo ruolo dell'utente
 * returns Risposta
 **/
exports.modificaRuolo = function(id,ruolo) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "messaggio" : "Messaggio",
  "codice" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

