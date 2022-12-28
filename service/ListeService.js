'use strict';


/**
 * Aggiunge attività alla lista
 * Aggiunge l'attività specificata alla lista
 *
 * id Long L'id della lista
 * attivita Long L'id dell'attività da aggiungere alla lista
 * returns Lista
 **/
exports.aggiungiAttivitaALista = function(id,attivita) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "attività" : [ 1, 1 ],
  "nome" : "nome",
  "id" : 0,
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "autore" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Crea lista
 * Crea una nuova lista
 *
 * body Lista La lista da aggiungere
 * returns Lista
 **/
exports.aggiungiLista = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "attività" : [ 1, 1 ],
  "nome" : "nome",
  "id" : 0,
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "autore" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Elimina lista
 * Elimina la lista con l'id specificato
 *
 * id Long L'id della lista
 * returns Risposta
 **/
exports.eliminaLista = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "messaggio" : "Messaggio",
  "codice" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Ottieni la lista
 * Ottieni la lista con l'id specificato
 *
 * id Long L'id della lista
 * returns Lista
 **/
exports.getLista = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "attività" : [ 1, 1 ],
  "nome" : "nome",
  "id" : 0,
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "autore" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Ottieni le liste
 * Ottieni le liste dell'utente
 *
 * returns Lista
 **/
exports.getListe = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "attività" : [ 1, 1 ],
  "nome" : "nome",
  "id" : 0,
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "autore" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Rimuovi attività dalla lista
 * Rimuove l'attività all'indice specificato dalla lista
 *
 * id Long L'id della lista
 * indice Long L'indice dell'attività da rimuovere dalla lista
 * returns Lista
 **/
exports.rimuoviAttivitaDaLista = function(id,indice) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "attività" : [ 1, 1 ],
  "nome" : "nome",
  "id" : 0,
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "autore" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

