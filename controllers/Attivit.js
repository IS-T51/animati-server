'use strict';

var utils = require('../utils/writer.js');
var Attivit = require('../service/AttivitService');

module.exports.aggiornaCatalogo = function aggiornaCatalogo (req, res, next, data) {
  Attivit.aggiornaCatalogo(data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.aggiungiAttività = function aggiungiAttività (req, res, next, body) {
  Attivit.aggiungiAttività(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.aggiungiSegnalazione = function aggiungiSegnalazione (req, res, next, body, id) {
  Attivit.aggiungiSegnalazione(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.aggiungiValutazione = function aggiungiValutazione (req, res, next, body, id) {
  Attivit.aggiungiValutazione(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAttività = function getAttività (req, res, next, id) {
  Attivit.getAttività(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCatalogo = function getCatalogo (req, res, next, filtro) {
  Attivit.getCatalogo(filtro)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modificaAttività = function modificaAttività (req, res, next, body, id) {
  Attivit.modificaAttività(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ottieniSegnalazioni = function ottieniSegnalazioni (req, res, next, id) {
  Attivit.ottieniSegnalazioni(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ottieniValutazione = function ottieniValutazione (req, res, next, id) {
  Attivit.ottieniValutazione(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
