'use strict';

const jwt = require('jsonwebtoken');
const Utente = require('../models/Utente');
const Lista = require('../models/Lista');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const utils = require('../utils/writer.js');
const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');
dotenv.config();

/**
 * Ottieni l'utente
 * Ottieni l'utente associato alla sessione corrente
 *
 * returns Utente
 **/
let getUtente = exports.getUtente = function (req) {
  return new Promise(function (resolve, reject) {
    // Ottengo Token
    const token = req.headers.authorization.replace(/^Bearer\s/, '');
    if (!token) {
      return reject(utils.respondWithCode(401, {
        "messaggio": "Autenticazione necessaria per fare questa richiesta",
        "codice": 401
      }));
    }
    // Verifico Token
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        return reject(utils.respondWithCode(401, {
          "messaggio": "Autenticazione non riuscita",
          "codice": 401,
          "errore": err
        }));
      }

      // Ottengo l'utente
      Utente.findById(decoded._id, function (err, utente) {
        // Se c'è un errore
        if (err) {
          return reject(utils.respondWithCode(500, {
            "messaggio": "Errore interno",
            "codice": 500,
            "errore": err
          }));
        }
        // Se l'utente non esiste
        if (!utente) {
          return reject(utils.respondWithCode(401, {
            "messaggio": "Autenticazione non riuscita",
            "codice": 401,
            "errore": {
              "message": "Utente non trovato"
            }
          }));
        }

        // Se il ruolo dell'utente ha subito modifiche
        if (utente.ruolo != decoded.ruolo) {
          return reject(utils.respondWithCode(401, {
            "messaggio": "Autenticazione non riuscita",
            "codice": 401,
            "errore": {
              "message": "Il tuo ruolo ha subito delle modifiche, logout necessario"
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
 * Ottieni gli utenti
 * Ottieni gli utenti iscritti all'applicativo
 *
 * returns List
 **/
exports.getUtenti = function (req) {
  return new Promise(function (resolve, reject) {
    // Verifico che sia amministratore
    getUtente(req).then(async function (io) {
      try {
        // Se non è amministratore, restituisci 403
        if (io.ruolo != "amministratore") {
          return reject(utils.respondWithCode(403, {
            "messaggio": "Non sei autorizzato a fare questa richiesta",
            "codice": 403
          }));
        }

        // Trova tutti gli utenti
        var utenti = await Utente.find().exec();
        resolve(utenti);
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
 * Modifica il ruolo
 * Modifica il ruolo dell'utente con l'id specificato
 *
 * id Long L'id dell'utente
 * ruolo String Il nuovo ruolo dell'utente
 * returns Risposta
 **/
exports.modificaRuolo = function (req, ruolo, id) {
  return new Promise(async function (resolve, reject) {
    // Verifico che io sia amministratore
    getUtente(req).then(async function (io) {
      try {
        // Se non sono amministratore, restituisci 403
        if (io.ruolo != "amministratore") {
          return reject(utils.respondWithCode(403, {
            "messaggio": "Non sei autorizzato a fare questa richiesta",
            "codice": 403,
            "errore": {
              "message": "Devi essere amministratore per modificare il ruolo di un utente"
            }
          }));
        }
        // Se sto modificando il mio ruolo, restituisci 403 (perché il super-admin si è promosso da solo)
        if (io._id.toString() == id) {
          return reject(utils.respondWithCode(403, {
            "messaggio": "Non sei autorizzato a fare questa richiesta",
            "codice": 403,
            "errore": {
              "message": "Non puoi modificare il tuo ruolo"
            }
          }));
        }

        // Trova l'utente
        var utente = await Utente.findById(id).exec();

        // Se non esiste, restituisci 404
        if (!utente) {
          return reject(utils.respondWithCode(404, {
            "messaggio": "Utente non trovato",
            "codice": 404
          }));
        }

        if (utente.ruolo != "amministratore") { // Promozione
          utente.ruolo = ruolo;
          utente.promossoDa = io._id;
          await utente.save();
          resolve({
            "messaggio": "Ruolo modificato",
            "codice": 200
          })
        } else { // Demozione
          // Cerca se sono il promotore di utente

          /* versione ricorsiva: albero di promozioni, posso declassare utente se sono un suo antenato nell'albero
          var utenteTemp = utente;
          while (utenteTemp.promossoDa && // Se non è null
            !utenteTemp.promossoDa.equals(utenteTemp._id) && // Se non è uguale a sé stesso
            !utenteTemp.promossoDa.equals(io._id)) { // Se non sono io
            utenteTemp = await Utente.findById(utenteTemp.promossoDa).exec();
          }*/

          // Se non sono il promotore di utente, restituisci 403
          if (!utente.promossoDa.equals(io._id)) {            // usare utenteTemp nell'if invece di utente per la versione ricorsiva
            return reject(utils.respondWithCode(403, {
              "messaggio": "Non sei autorizzato a fare questa richiesta",
              "codice": 403,
              "errore": {
                "message": "Non sei il promotore di questo utente"
              }
            }));
          }

          // Modifica il promotore di tutti i promossi da utente
          await Utente.updateMany({
            promossoDa: utente._id
          }, {
            promossoDa: utente.promossoDa
          }).exec();

          // Modifica il ruolo di utente
          utente.promossoDa = io._id;
          utente.ruolo = ruolo;
          await utente.save();

          return resolve({
            "messaggio": "Ruolo modificato",
            "codice": 200
          })
        }
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
 * Login
 * Reindiritizza l'utente alla pagina di login
 *
 * returns Risposta
 */
exports.login = function () {
  return new Promise(function (resolve, reject) {
    try {
      const url = OAUTH.generateAuthUrl({
        access_type: 'offline',
        scope: [
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile'
        ]
      });
      resolve(url);
    } catch (err) {
      reject(utils.respondWithCode(500, {
        "messaggio": "Errore interno",
        "codice": 500,
        "errore": err
      }));
    }
  });
}

/**
 * Login con Google
 * Verifica il codice autorizzativo fornito da Google e crea un utente
 *
 * codiceAutorizzativo String Il codice autorizzativo fornito da Google
 * returns Utente
 **/
const OAUTH = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
exports.loginGoogle = function (code) {
  return new Promise(async function (resolve, reject) {

    // Ottengo il token

    await OAUTH.getToken(decodeURIComponent(code)).then(async function ({ tokens }) {
      const client = new OAuth2Client();
      client.setCredentials(tokens);
      const oauth = google.oauth2({ version: 'v2', auth: client });
      const res = await oauth.userinfo.get();

      const email = res.data.email;
      const immagine = res.data.picture;

      // Verifico se l'utente esiste
      var utente = await Utente.findOne({ email: email }).exec();

      if (utente) {
        // Se esiste, restituisci il token
        resolve({
          "messaggio": "Login effettuato",
          "codice": 200,
          "token": jwt.sign(utente.toObject(),
            process.env.JWT_SECRET_KEY, {
            expiresIn: 86400 // 24 ore
          }
          )
        })
      } else {
        // Se non esiste, crealo
        utente = await Utente.findOneAndUpdate(
          { email: email },
          { email: email, immagine: immagine },
          { upsert: true, new: true }
        ).exec();

        // Creo lista preferiti
        var preferiti = await Lista.findByIdAndUpdate(
          utente._id,
          { $set: { autore: utente._id, nome: "Preferiti" } },
          { upsert: true, new: false }
        ).exec();

        // Cambio id eventuale conflitto    // potrebbe essere un problema per la sincronizzazione offline
        if (preferiti) {
          var clone = new Lista(preferiti);
          clone._id = mongoose.Types.ObjectId();
          await clone.save();
        }

        resolve({
          "messaggio": "Registrazione effettuata",
          "codice": 201,
          "token": jwt.sign(utente.toObject(),
            process.env.JWT_SECRET_KEY, {
            expiresIn: 86400 // 24 ore
          }
          )
        })
      }
    }).catch(function (err) {
      let status = err?.response?.status;
      if (status == 400) {
        console.log(err)
        return reject(utils.respondWithCode(400, {
          "messaggio": "Codice invalido",
          "codice": 400,
          "errore": err
        }));
      }

      console.log(err)
      reject(utils.respondWithCode(500, {
        "messaggio": "Errore interno",
        "codice": 500,
        "errore": err
      }));
    })

  });
}