'use strict';


/**
 * Aggiorna il catalogo
 * Restituisce le attività aggiornate dopo la data specificata
 *
 * data Date La data dopo la quale cercare le attività aggiornate
 * returns List
 **/
exports.aggiornaCatalogo = function (data) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
      "numeroSegnalazioni": 0,
      "descrizione": "descrizione",
      "mediaValutazioni": 4.650722121966288,
      "banner": "http://example.com/aeiou",
      "id": 0,
      "collegamenti": [{
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }, {
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }],
      "utimaModifica": "2000-01-23T04:56:07.000+00:00",
      "informazioni": {
        "età": {
          "a": 0,
          "da": 0
        },
        "durataMedia": 0,
        "etichette": [{
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }, {
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }],
        "giocatoriPerSquadraSet": true,
        "titlo": "titlo",
        "giocatoriPerSquadra": 0,
        "unitàDurata": "minuti",
        "numeroSquadre": 0,
        "numeroSquadreSet": true
      },
      "autore": 7
    }, {
      "numeroSegnalazioni": 0,
      "descrizione": "descrizione",
      "mediaValutazioni": 4.650722121966288,
      "banner": "http://example.com/aeiou",
      "id": 0,
      "collegamenti": [{
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }, {
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }],
      "utimaModifica": "2000-01-23T04:56:07.000+00:00",
      "informazioni": {
        "età": {
          "a": 0,
          "da": 0
        },
        "durataMedia": 0,
        "etichette": [{
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }, {
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }],
        "giocatoriPerSquadraSet": true,
        "titlo": "titlo",
        "giocatoriPerSquadra": 0,
        "unitàDurata": "minuti",
        "numeroSquadre": 0,
        "numeroSquadreSet": true
      },
      "autore": 7
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Aggiungi l'attività
 * Aggiungi l'attività al catalogo
 *
 * body Attivita L'attività da aggiungere
 * returns Attivita
 **/
exports.aggiungiAttività = function (body) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "numeroSegnalazioni": 0,
      "descrizione": "descrizione",
      "mediaValutazioni": 4.650722121966288,
      "banner": "http://example.com/aeiou",
      "id": 0,
      "collegamenti": [{
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }, {
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }],
      "utimaModifica": "2000-01-23T04:56:07.000+00:00",
      "informazioni": {
        "età": {
          "a": 0,
          "da": 0
        },
        "durataMedia": 0,
        "etichette": [{
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }, {
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }],
        "giocatoriPerSquadraSet": true,
        "titlo": "titlo",
        "giocatoriPerSquadra": 0,
        "unitàDurata": "minuti",
        "numeroSquadre": 0,
        "numeroSquadreSet": true
      },
      "autore": 7
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Aggiungi segnalazione
 * Aggiunge una segnalazione all'attività
 *
 * body Segnalazione La segnalazione da aggiungere
 * id Long L'id dell'attività
 * returns Risposta
 **/
exports.aggiungiSegnalazione = function (body, id) {
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


/**
 * Aggiungi valutazione
 * Aggiunge la valutazione all'attività
 *
 * body Valutazione La valutazione da aggiungere
 * id Long L'id dell'attività
 * returns Risposta
 **/
exports.aggiungiValutazione = function (body, id) {
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


/**
 * Ottieni l'attività
 * Ottieni l'attività con l'id specificato
 *
 * id Long L'id dell'attività
 * returns Attivita
 **/
exports.getAttività = function (id) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "numeroSegnalazioni": 0,
      "descrizione": "descrizione",
      "mediaValutazioni": 4.650722121966288,
      "banner": "http://example.com/aeiou",
      "id": 0,
      "collegamenti": [{
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }, {
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }],
      "utimaModifica": "2000-01-23T04:56:07.000+00:00",
      "informazioni": {
        "età": {
          "a": 0,
          "da": 0
        },
        "durataMedia": 0,
        "etichette": [{
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }, {
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }],
        "giocatoriPerSquadraSet": true,
        "titlo": "titlo",
        "giocatoriPerSquadra": 0,
        "unitàDurata": "minuti",
        "numeroSquadre": 0,
        "numeroSquadreSet": true
      },
      "autore": 7
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Ottieni il catalogo
 * Ottieni il catalogo
 *
 * filtro Filtro Il filtro da applicare al catalogo (optional)
 * returns List
 **/
exports.getCatalogo = function (filtro) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
      "numeroSegnalazioni": 0,
      "descrizione": "descrizione",
      "mediaValutazioni": 4.650722121966288,
      "banner": "http://example.com/aeiou",
      "id": 0,
      "collegamenti": [{
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }, {
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }],
      "utimaModifica": "2000-01-23T04:56:07.000+00:00",
      "informazioni": {
        "età": {
          "a": 0,
          "da": 0
        },
        "durataMedia": 0,
        "etichette": [{
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }, {
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }],
        "giocatoriPerSquadraSet": true,
        "titlo": "titlo",
        "giocatoriPerSquadra": 0,
        "unitàDurata": "minuti",
        "numeroSquadre": 0,
        "numeroSquadreSet": true
      },
      "autore": 7
    }, {
      "numeroSegnalazioni": 0,
      "descrizione": "descrizione",
      "mediaValutazioni": 4.650722121966288,
      "banner": "http://example.com/aeiou",
      "id": 0,
      "collegamenti": [{
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }, {
        "link": "http://example.com/aeiou",
        "nome": "nome"
      }],
      "utimaModifica": "2000-01-23T04:56:07.000+00:00",
      "informazioni": {
        "età": {
          "a": 0,
          "da": 0
        },
        "durataMedia": 0,
        "etichette": [{
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }, {
          "descrizione": "descrizione",
          "categoria": "categoria",
          "nome": "nome"
        }],
        "giocatoriPerSquadraSet": true,
        "titlo": "titlo",
        "giocatoriPerSquadra": 0,
        "unitàDurata": "minuti",
        "numeroSquadre": 0,
        "numeroSquadreSet": true
      },
      "autore": 7
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Modifica l'attività
 * Modifica l'attività con l'id specificato
 *
 * body Attivita L'attività modificata
 * id Long L'id dell'attività
 * returns Risposta
 **/
exports.modificaAttività = function (body, id) {
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


/**
 * Ottieni segnalazioni di un'attività
 * Ottiene tutte le segnalazioni in un'attività
 *
 * id Long L'id dell'attività
 * returns List
 **/
exports.ottieniSegnalazioni = function (id) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
      "attività": 0,
      "titolo": "titolo",
      "messaggio": "messaggio",
      "autore": 6
    }, {
      "attività": 0,
      "titolo": "titolo",
      "messaggio": "messaggio",
      "autore": 6
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Ottieni valutazione di un'attività
 * Ottiene la valutazione dell'utente di un'attività
 *
 * id Long L'id dell'attività
 * returns List
 **/
exports.ottieniValutazione = function (id) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = [{
      "attività": 6,
      "voto": 0.40041409523050575,
      "autore": 1
    }, {
      "attività": 6,
      "voto": 0.40041409523050575,
      "autore": 1
    }];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}