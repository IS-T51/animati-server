'use strict';

var utils = require.main.require('./utils/writer.js');
var Etichette = require.main.require('./service/EtichetteService');

module.exports.aggiungiEtichetta = function aggiungiEtichetta (req, res, next, body) {
  Etichette.aggiungiEtichetta(req, body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ottieniEtichette = function ottieniEtichette (req, res, next) {
  Etichette.ottieniEtichette()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
