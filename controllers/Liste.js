'use strict';

var utils = require('../utils/writer.js');
var Liste = require('../service/ListeService');

module.exports.aggiungiAttivitaALista = function aggiungiAttivitaALista (req, res, next, id, attivita) {
  Liste.aggiungiAttivitaALista(id, attivita)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.aggiungiLista = function aggiungiLista (req, res, next, body) {
  Liste.aggiungiLista(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eliminaLista = function eliminaLista (req, res, next, id) {
  Liste.eliminaLista(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getLista = function getLista (req, res, next, id) {
  Liste.getLista(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getListe = function getListe (req, res, next) {
  Liste.getListe()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rimuoviAttivitaDaLista = function rimuoviAttivitaDaLista (req, res, next, id, indice) {
  Liste.rimuoviAttivitaDaLista(id, indice)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
