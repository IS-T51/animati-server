'use strict';


/**
 * Elimina l'utente
 * Elimina l'utente con l'id specificato
 *
 * id Long L'id dell'utente
 * returns Risposta
 **/
exports.eliminaUtente = function (id) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "messaggio": "Messaggio",
      "codice": 0
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Ottieni l'utente
 * Ottieni l'utente associato alla sessione corrente
 *
 * returns Utente
 **/
exports.getUtente = function () {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "ruolo": "autenticato",
      "id": 0,
      "email": ""
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Effettua il login
 *
 * no response value expected for this operation
 **/
exports.login = function () {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Login con Google
 * Verifica il codice autorizzativo fornito da Google e crea un utente
 *
 * codiceAutorizzativo String Il codice autorizzativo fornito da Google
 * returns Utente
 **/
exports.loginGoogle = function (codiceAutorizzativo) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "ruolo": "autenticato",
      "id": 0,
      "email": ""
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
exports.modificaRuolo = function (id, ruolo) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "messaggio": "Messaggio",
      "codice": 0
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}