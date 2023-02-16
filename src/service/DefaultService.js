'use strict';

/**
 * Ping
 * Ping
 *
 * returns Risposta
 **/
exports.ping = function() {
  return new Promise(function(resolve, reject) {
    resolve({
      "messaggio" : "PONG"
    });
  });
}

