'use strict';

var utils = require('../utils/writer.js');
var Attivita = require('../models/Attivita.js');
var Segnalazione = require('../models/Segnalazione.js');
var Valutazione = require('../models/Valutazione.js');
var UtenteService = require('./UtenteService.js');

/**
 * Aggiorna il catalogo
 * Restituisce le attività aggiornate dopo la data specificata
 *
 * data Date La data dopo la quale cercare le attività aggiornate
 * returns List
 **/
exports.aggiornaCatalogo = function(data) {
  // TODO: implement
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "numeroSegnalazioni" : 0,
  "mediaValutazioni" : 4.650722121966288,
  "banner" : "http://example.com/aeiou",
  "id" : 0,
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
    "titolo" : "titolo",
    "giocatoriPerSquadra" : 0,
    "unitàDurata" : "minuti",
    "numeroSquadre" : 0,
    "numeroSquadreSet" : true
  },
  "autore" : 7
}, {
  "numeroSegnalazioni" : 0,
  "descrizione" : "descrizione",
  "mediaValutazioni" : 4.650722121966288,
  "banner" : "http://example.com/aeiou",
  "id" : 0,
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
    "titolo" : "titolo",
    "giocatoriPerSquadra" : 0,
    "unitàDurata" : "minuti",
    "numeroSquadre" : 0,
    "numeroSquadreSet" : true
  },
  "autore" : 7
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
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        var attivita = await new Attivita(body);
        attivita.autore = io._id;
        attivita.save();

        resolve(attivita);
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio" : "Errore interno",
          "codice" : 500,
          "errore" : err
        }));
      }
    }).catch(function(response) {
      // Errore autenticazione
      return reject(response);
    });
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
exports.aggiungiSegnalazione = function(req, body,id) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // Verifica che l'attività esista
        var attivita = await Attivita.findById(id).exec();
        if(!attivita) {
          return reject(utils.respondWithCode(404, {
            "messaggio" : "Attività non trovata",
            "codice" : 404
          }));
        }
        // Ottieni la segnalazione
        var segnalazione = await Segnalazione.findOneAndUpdate(
          {autore: io._id, attività: attivita._id, titolo: body.titolo},
          {autore: io._id, attività: attivita._id, titolo: body.titolo, messaggio: body.messaggio},
          {upsert: true, new: false, runValidators: true}).exec();
        
          // Se ce ne sono, restituisci 200, altrimenti 201
        if(segnalazione) {
          return resolve({
            "messaggio" : "Segnalazione aggiornata",
            "codice" : 200
          });
        } else {
          resolve(utils.respondWithCode(201,{
            "messaggio" : "Segnalazione aggiunta",
            "codice" : 201
          }));
        }
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio" : "Errore interno",
          "codice" : 500,
          "errore" : err
        }));
      }
    }).catch(function(response) {
      // Errore autenticazione
      return reject(response);
    });
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
exports.aggiungiValutazione = function(req, body,id) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // Verifica che l'attività esista
        var attivita = await Attivita.findById(id).exec();
        if(!attivita) {
          return reject(utils.respondWithCode(404, {
            "messaggio" : "Attività non trovata",
            "codice" : 404
          }));
        }
        // Ottieni la valutazione
        var valutazione = await Valutazione.findOneAndUpdate(
          {autore: io._id, attività: attivita._id},
          {autore: io._id, attività: attivita._id, voto: body.voto},
          {upsert: true, new: false, runValidators: true}).exec();
        
          // Se ce ne sono, restituisci 200, altrimenti 201
        if(valutazione) {
          return resolve({
            "messaggio" : "Valutazione aggiornata",
            "codice" : 200
          });
        } else {
          resolve(utils.respondWithCode(201,{
            "messaggio" : "Valutazione aggiunta",
            "codice" : 201
          }));
        }
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio" : "Errore interno",
          "codice" : 500,
          "errore" : err
        }));
      }
    }).catch(function(response) {
      // Errore autenticazione
      return reject(response);
    });
  });
}


/**
 * Ottieni l'attività
 * Ottieni l'attività con l'id specificato
 *
 * id Long L'id dell'attività
 * returns Attivita
 **/
exports.getAttivita = function(id) {
  return new Promise(async function(resolve, reject) {
    try {
      // Trova tutte le etichette
      var attivita = await Attivita.findById(id).exec();
      
      // Se non esiste, restituisci 404
      if (!attivita) {
        reject(utils.respondWithCode(404,{
          "messaggio" : "Attivita non trovata",
          "codice" : 404
        }));
      }

      resolve(attivita);
    } catch (err) {
      reject(utils.respondWithCode(500,{
        "messaggio" : "Errore interno",
        "codice" : 500,
        "errore" : err
      }));
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
  console.log(filtro);
  return new Promise(async function(resolve, reject) {
    try {
      let query = {};
      if (filtro) {
        if(filtro['titolo']){
          if(!query['informazioni']) query['informazioni'] = {};
          query['informazioni']['titolo'] = {$regex: filtro['titolo'], $options: 'i'};
        }
        if(filtro['descrizione']){
          if(!query['informazioni']) query['informazioni'] = {};
          query['informazioni']['descrizione'] = {$regex: filtro['descrizione'], $options: 'i'};
        }
        if(filtro['etàMin']){
          if(!query['informazioni']) query['informazioni'] = {};
          query['informazioni']['etàMax'] = {$gte: filtro['etàMin']};
        }
        if(filtro['etàMax']){
          if(!query['informazioni']) query['informazioni'] = {};
          query['informazioni']['etàMin'] = {$lte: filtro['etàMax']};
        }
        if(filtro['durataMin']){
          if(!query['informazioni']) query['informazioni'] = {};
          query['informazioni']['durataMax'] = {$gte: filtro['durataMin']};
        }
        if(filtro['durataMax']){
          if(!query['informazioni']) query['informazioni'] = {};
          query['informazioni']['durataMin'] = {$lte: filtro['durataMax']};
        }
        if(filtro['giocatoriMin']){
          if(!query['informazioni']) query['informazioni'] = {};
          query['informazioni']['giocatoriMax'] = {$gte: filtro['giocatoriMin']};
        }
        if(filtro['giocatoriMax']){
          if(!query['informazioni']) query['informazioni'] = {};
          query['informazioni']['giocatoriMin'] = {$lte: filtro['giocatoriMax']};
        }
        if(filtro['giocatoriPerSquadra']){
          if(!query['informazioni']) query['informazioni'] = {};
          query['informazioni']['giocatoriPerSquadra'] = filtro['giocatoriPerSquadra'];
        }
        if(filtro['numeroSquadre']){
          if(!query['informazioni']) query['informazioni'] = {};
          query['informazioni']['numeroSquadre'] = filtro['numeroSquadre'];
        }
        if(filtro['autore']){
          query['autore'] = new mongoose.Types.ObjectId(filtro['autore']);
        }
        if(filtro['ultimaModificaMin']){
          query['ultimaModifica'] = {$gte: filtro['ultimaModificaMin']};
        }
        if(filtro['ultimaModificaMax']){
          query['ultimaModifica'] = {$lte: filtro['ultimaModificaMax']};
        }
        if(filtro['mediaValutazioneMin']){
          query['mediaValutazione'] = {$gte: filtro['mediaValutazioneMin']};
        }
        if(filtro['mediaValutazioneMax']){
          query['mediaValutazione'] = {$lte: filtro['numeroValutazioneMax']};
        }
        if(filtro['numeroSegnalazioniMin']){
          query['numeroSegnalazioni'] = {$gte: filtro['numeroSegnalazioniMin']};
        }
        if(filtro['numeroSegnalazioniMax']){
          query['numeroSegnalazioni'] = {$lte: filtro['numeroSegnalazioniMax']};
        }

        // TODO: etichette
        /*if(filtro['etichette']){
          query['etichette'] = {$all: filtro['etichette']};
        }*/
      }
        
      // Trova tutte le etichette
      var limit = filtro['limite'] || 100;
      var catalogo = await Attivita.find(query)
      .limit(limit)
      .skip(limit*(filtro['pagina'] || 0))
      .exec();
      
      // Se esiste, restituisci 200, altrimenti 204
      if (catalogo) {
        resolve(catalogo);
      } else{
        resolve(utils.respondWithCode(204, {
          "messaggio" : "Nessuna attività trovata",
          "codice" : 204,
          "errore" : err
        }));
      }
    } catch (err) {
      reject(utils.respondWithCode(500,{
        "messaggio" : "Errore interno",
        "codice" : 500,
        "errore" : err
      }));
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
exports.modificaAttivita = function(req, body,id) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // Ottieni l'attività
        var attivita = await Attivita.findById(id).exec();

        // Se non esiste, restituisci 404
        if(!attivita) {
          return reject(utils.respondWithCode(404, {
            "messaggio" : "Attività non trovata",
            "codice" : 404
          }));
        }
        
        // Se non è amministratore e non è l'autore, restituisci 403
        if(io.ruolo != "amministratore" && !attivita.autore.equals(io._id)) {
          return reject(utils.respondWithCode(403, {
            "messaggio" : "Non sei autorizzato a fare questa richiesta",
            "codice" : 403
          }));
        }

        // Modifica l'attività
        attivita = await Attivita.findByIdAndUpdate(id, {
          informazioni: body.informazioni,
          banner: body.banner,
          collegamenti: body.collegamenti,
          ultimaModifica: new Date(),
        }, {new: true}).exec();

        // Restituisci 200
        resolve(attivita);
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio" : "Errore interno",
          "codice" : 500,
          "errore" : err
        }));
      }
    }).catch(function(response) {
      // Errore autenticazione
      return reject(response);
    });
  });
}


/**
 * Ottieni segnalazioni di un'attività
 * Ottiene tutte le segnalazioni in un'attività
 *
 * id Long L'id dell'attività
 * returns List
 **/
exports.ottieniSegnalazioni = function(req, id) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      // Se non è amministratore, restituisci 403
      if(io.ruolo != "amministratore") {
        return reject(utils.respondWithCode(403, {
          "messaggio" : "Non sei autorizzato a fare questa richiesta",
          "codice" : 403
        }));
      }

      try {
        // Verifica che l'attività esista
        var attivita = await Attivita.findById(id).exec();
        if(!attivita) {
          return reject(utils.respondWithCode(404, {
            "messaggio" : "Attività non trovata",
            "codice" : 404
          }));
        }

        // Ottieni le segnalazioni
        var segnalazioni = await Segnalazione.find({attività: id}).exec();
        // Se ce ne sono, restituisci 200, altrimenti 204
        if(segnalazioni.length > 0) {
          return resolve(segnalazioni);
        } else {
          resolve(utils.respondWithCode(204,{
            "messaggio" : "Nessuna segnalazione trovata",
            "codice" : 204
          }));
        }
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio" : "Errore interno",
          "codice" : 500,
          "errore" : err
        }));
      }
    }).catch(function(response) {
      // Errore autenticazione
      return reject(response);
    });
  });
}


/**
 * Ottieni valutazione di un'attività
 * Ottiene la valutazione dell'utente di un'attività
 *
 * id Long L'id dell'attività
 * returns Valutazione
 **/
exports.ottieniValutazione = function(req, id) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // Verifica che l'attività esista
        var attivita = await Attivita.findById(id).exec();
        if(!attivita) {
          return reject(utils.respondWithCode(404, {
            "messaggio" : "Attività non trovata",
            "codice" : 404
          }));
        }
        // Ottieni la valutazione
        var valutazione = await Valutazione.findOne({autore: io._id, attività: id}).exec();
        // Se ce ne sono, restituisci 200, altrimenti 204
        if(valutazione) {
          return resolve(valutazione);
        } else {
          resolve(utils.respondWithCode(204,{
            "messaggio" : "Nessuna valutazione trovata",
            "codice" : 204
          }));
        }
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio" : "Errore interno",
          "codice" : 500,
          "errore" : err
        }));
      }
    }).catch(function(response) {
      // Errore autenticazione
      return reject(response);
    });
  });
}

