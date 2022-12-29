'use strict';

var utils = require.main.require('./utils/writer.js');
var Default = require.main.require('./service/DefaultService');

module.exports.ping = function ping (req, res, next) {
  Default.ping()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
