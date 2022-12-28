'use strict';


/**
 * Ping
 * Ping
 *
 * returns Risposta
 **/
exports.ping = function () {
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