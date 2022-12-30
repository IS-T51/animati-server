'use strict';


/**
 * Aggiorna il catalogo
 * Restituisce le attività aggiornate dopo la data specificata
 *
 * data Date La data dopo la quale cercare le attività aggiornate
 * returns List
 **/
exports.aggiornaCatalogo = function(data) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "numeroSegnalazioni" : 0,
  "mediaValutazioni" : 2.3021358869347655,
  "banner" : "http://example.com/aeiou",
  "id" : "id",
  "collegamenti" : [ {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  }, {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  } ],
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "informazioni" : {
    "età" : {
      "a" : 0,
      "da" : 0
    },
    "durataMedia" : 0,
    "etichette" : [ {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    }, {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    } ],
    "giocatoriPerSquadraSet" : true,
    "descrizione" : "descrizione",
    "titlo" : "titlo",
    "giocatoriPerSquadra" : 0,
    "unitàDurata" : "minuti",
    "numeroSquadre" : 0,
    "numeroSquadreSet" : true
  },
  "autore" : "autore"
}, {
  "numeroSegnalazioni" : 0,
  "mediaValutazioni" : 2.3021358869347655,
  "banner" : "http://example.com/aeiou",
  "id" : "id",
  "collegamenti" : [ {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  }, {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  } ],
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "informazioni" : {
    "età" : {
      "a" : 0,
      "da" : 0
    },
    "durataMedia" : 0,
    "etichette" : [ {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    }, {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    } ],
    "giocatoriPerSquadraSet" : true,
    "descrizione" : "descrizione",
    "titlo" : "titlo",
    "giocatoriPerSquadra" : 0,
    "unitàDurata" : "minuti",
    "numeroSquadre" : 0,
    "numeroSquadreSet" : true
  },
  "autore" : "autore"
} ];
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
exports.aggiungiAttivita = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "numeroSegnalazioni" : 0,
  "mediaValutazioni" : 2.3021358869347655,
  "banner" : "http://example.com/aeiou",
  "id" : "id",
  "collegamenti" : [ {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  }, {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  } ],
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "informazioni" : {
    "età" : {
      "a" : 0,
      "da" : 0
    },
    "durataMedia" : 0,
    "etichette" : [ {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    }, {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    } ],
    "giocatoriPerSquadraSet" : true,
    "descrizione" : "descrizione",
    "titlo" : "titlo",
    "giocatoriPerSquadra" : 0,
    "unitàDurata" : "minuti",
    "numeroSquadre" : 0,
    "numeroSquadreSet" : true
  },
  "autore" : "autore"
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
 * id String L'id dell'attività
 * returns Risposta
 **/
exports.aggiungiSegnalazione = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "messaggio" : "messaggio",
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
 * Aggiungi valutazione
 * Aggiunge la valutazione all'attività
 *
 * body Valutazione La valutazione da aggiungere
 * id String L'id dell'attività
 * returns Risposta
 **/
exports.aggiungiValutazione = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "messaggio" : "messaggio",
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
 * Ottieni l'attività
 * Ottieni l'attività con l'id specificato
 *
 * id String L'id dell'attività
 * returns Attivita
 **/
exports.getAttivita = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "numeroSegnalazioni" : 0,
  "mediaValutazioni" : 2.3021358869347655,
  "banner" : "http://example.com/aeiou",
  "id" : "id",
  "collegamenti" : [ {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  }, {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  } ],
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "informazioni" : {
    "età" : {
      "a" : 0,
      "da" : 0
    },
    "durataMedia" : 0,
    "etichette" : [ {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    }, {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    } ],
    "giocatoriPerSquadraSet" : true,
    "descrizione" : "descrizione",
    "titlo" : "titlo",
    "giocatoriPerSquadra" : 0,
    "unitàDurata" : "minuti",
    "numeroSquadre" : 0,
    "numeroSquadreSet" : true
  },
  "autore" : "autore"
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
exports.getCatalogo = function(filtro) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "numeroSegnalazioni" : 0,
  "mediaValutazioni" : 2.3021358869347655,
  "banner" : "http://example.com/aeiou",
  "id" : "id",
  "collegamenti" : [ {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  }, {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  } ],
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "informazioni" : {
    "età" : {
      "a" : 0,
      "da" : 0
    },
    "durataMedia" : 0,
    "etichette" : [ {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    }, {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    } ],
    "giocatoriPerSquadraSet" : true,
    "descrizione" : "descrizione",
    "titlo" : "titlo",
    "giocatoriPerSquadra" : 0,
    "unitàDurata" : "minuti",
    "numeroSquadre" : 0,
    "numeroSquadreSet" : true
  },
  "autore" : "autore"
}, {
  "numeroSegnalazioni" : 0,
  "mediaValutazioni" : 2.3021358869347655,
  "banner" : "http://example.com/aeiou",
  "id" : "id",
  "collegamenti" : [ {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  }, {
    "link" : "http://example.com/aeiou",
    "nome" : "nome"
  } ],
  "utimaModifica" : "2000-01-23T04:56:07.000+00:00",
  "informazioni" : {
    "età" : {
      "a" : 0,
      "da" : 0
    },
    "durataMedia" : 0,
    "etichette" : [ {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    }, {
      "descrizione" : "descrizione",
      "categoria" : "categoria",
      "nome" : "nome"
    } ],
    "giocatoriPerSquadraSet" : true,
    "descrizione" : "descrizione",
    "titlo" : "titlo",
    "giocatoriPerSquadra" : 0,
    "unitàDurata" : "minuti",
    "numeroSquadre" : 0,
    "numeroSquadreSet" : true
  },
  "autore" : "autore"
} ];
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
 * id String L'id dell'attività
 * returns Risposta
 **/
exports.modificaAttivita = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "messaggio" : "messaggio",
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
 * Ottieni segnalazioni di un'attività
 * Ottiene tutte le segnalazioni in un'attività
 *
 * id String L'id dell'attività
 * returns List
 **/
exports.ottieniSegnalazioni = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "attività" : "attività",
  "titolo" : "titolo",
  "messaggio" : "messaggio",
  "autore" : "autore"
}, {
  "attività" : "attività",
  "titolo" : "titolo",
  "messaggio" : "messaggio",
  "autore" : "autore"
} ];
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
 * id String L'id dell'attività
 * returns List
 **/
exports.ottieniValutazione = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "attività" : "attività",
  "voto" : 1,
  "autore" : "autore"
}, {
  "attività" : "attività",
  "voto" : 1,
  "autore" : "autore"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

