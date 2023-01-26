'use strict';

var utils = require('../utils/writer.js');
var Liste = require('../service/ListeService');

module.exports.aggiungiAttivitaALista = function aggiungiAttivitaALista (req, res, next, attivita, id) {
  Liste.aggiungiAttivitaALista(req, attivita, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.aggiungiLista = function aggiungiLista (req, res, next, body) {
  Liste.aggiungiLista(req, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eliminaLista = function eliminaLista (req, res, next, id) {
  Liste.eliminaLista(req, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getLista = function getLista (req, res, next, id) {
  Liste.getLista(req, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getListe = function getListe (req, res, next) {
  Liste.getListe(req)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rimuoviAttivitaDaLista = function rimuoviAttivitaDaLista (req, res, next, id, indice) {
  Liste.rimuoviAttivitaDaLista(req, id, indice)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
