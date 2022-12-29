'use strict';

var utils = require.main.require('./utils/writer.js');
var Attivita = require.main.require('./service/AttivitaService');

module.exports.aggiornaCatalogo = function aggiornaCatalogo (req, res, next, data) {
  Attivita.aggiornaCatalogo(data)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.aggiungiAttivita = function aggiungiAttivita (req, res, next, body) {
  Attivita.aggiungiAttivita(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.aggiungiSegnalazione = function aggiungiSegnalazione (req, res, next, body, id) {
  Attivita.aggiungiSegnalazione(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.aggiungiValutazione = function aggiungiValutazione (req, res, next, body, id) {
  Attivita.aggiungiValutazione(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAttivita = function getAttivita (req, res, next, id) {
  Attivita.getAttivita(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCatalogo = function getCatalogo (req, res, next, filtro) {
  Attivita.getCatalogo(filtro)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modificaAttivita = function modificaAttivita (req, res, next, body, id) {
  Attivita.modificaAttivita(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ottieniSegnalazioni = function ottieniSegnalazioni (req, res, next, id) {
  Attivita.ottieniSegnalazioni(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ottieniValutazione = function ottieniValutazione (req, res, next, id) {
  Attivita.ottieniValutazione(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
