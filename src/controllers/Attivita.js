'use strict';

var utils = require('../utils/writer.js');
var Attivita = require('../service/AttivitaService');

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
  Attivita.aggiungiAttivita(req, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.aggiungiSegnalazione = function aggiungiSegnalazione (req, res, next, body, id) {
  Attivita.aggiungiSegnalazione(req, body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.aggiungiValutazione = function aggiungiValutazione (req, res, next, body, id) {
  Attivita.aggiungiValutazione(req, body, id)
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

module.exports.getCatalogo = function getCatalogo (req, res, next, informazioni, autore, ultimaModificaMin, ultimaModificaMax, mediaValutazioniMin, mediaValutazioniMax, numeroSegnalazioniMin, numeroSegnalazioniMax, pagina, limite) {
  Attivita.getCatalogo(informazioni, autore, ultimaModificaMin, ultimaModificaMax, mediaValutazioniMin, mediaValutazioniMax, numeroSegnalazioniMin, numeroSegnalazioniMax, pagina, limite)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.modificaAttivita = function modificaAttivita (req, res, next, body, id) {
  Attivita.modificaAttivita(req, body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ottieniSegnalazioni = function ottieniSegnalazioni (req, res, next, id) {
  Attivita.ottieniSegnalazioni(req, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ottieniValutazione = function ottieniValutazione (req, res, next, id) {
  Attivita.ottieniValutazione(req, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
