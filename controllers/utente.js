'use strict';

var utils = require('../utils/writer.js');
var Utente = require('../service/UtenteService');

module.exports.eliminaUtente = function eliminaUtente (req, res, next, id) {
  Utente.eliminaUtente(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUtente = function getUtente (req, res, next) {
  Utente.getUtente()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.login = function login (req, res, next) {
  Utente.login()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginGoogle = function loginGoogle (req, res, next, codiceAutorizzativo) {
  Utente.loginGoogle(codiceAutorizzativo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modificaRuolo = function modificaRuolo (req, res, next, id, ruolo) {
  Utente.modificaRuolo(id, ruolo)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
