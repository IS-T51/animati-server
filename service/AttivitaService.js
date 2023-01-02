'use strict';

var utils = require('../utils/writer.js');
var Attivita = require('../models/Attivita.js');
var Segnalazione = require('../models/Segnalazione.js');
var Valutazione = require('../models/Valutazione.js');
var UtenteService = require('./UtenteService.js');
var Etichetta = require('../models/Etichetta.js');
var mongoose = require('mongoose');

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
exports.aggiungiAttivita = function(req, body) {
  return new Promise(async function(resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function(io) {
      try {
        // TODO: Aggiungi controlli e etichetta proposta
        // Cerco o creo l'etichetta
        var etichette = [];
        var etichetteString = body.informazioni?.etichette || [];
        await Promise.all(etichetteString.map(async function(etichetta) {
          var etichetta = await Etichetta.findOne({nome: etichetta});
          etichette.push(etichetta);
        }));
        body.informazioni.etichette = etichette;

        console.log(body);
        var attivita = await new Attivita(body);
        attivita.autore = io._id;
        await attivita.save();

        resolve(attivita);
      } catch (err) {
        console.log(err);
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
        var segnalazione = new Segnalazione(
          {autore: io._id, attività: attivita._id, titolo: body.titolo, messaggio: body.messaggio}
        )
        // Salva la segnalazione
        await segnalazione.save();
        
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
exports.getCatalogo = function(informazioni, autore, ultimaModificaMin, ultimaModificaMax, mediaValutazioniMin, mediaValutazioniMax, numeroSegnalazioniMin, numeroSegnalazioniMax, pagina, limite) {
  return new Promise(async function(resolve, reject) {
    try {
      let mongo_query = {};
      let limit = limite || 50;
      let page = pagina || 0;
      
      if (informazioni) {
        if(informazioni['titolo']){
          mongo_query['informazioni'] = mongo_query['informazioni'] || {};
          mongo_query['informazioni']['titolo'] = {$regex: informazioni['titolo'], $options: 'i'};
        }
        if(informazioni['descrizione']){
          mongo_query['informazioni'] = mongo_query['informazioni'] || {};
          mongo_query['informazioni']['descrizione'] = {$regex: informazioni['descrizione'], $options: 'i'};
        }
        if(informazioni['etàMin']){
          mongo_query['informazioni'] = mongo_query['informazioni'] || {};
          mongo_query['informazioni']['etàMax'] = {$gte: informazioni['etàMin']};
        }
        if(informazioni['etàMax']){
          mongo_query['informazioni'] = mongo_query['informazioni'] || {};
          mongo_query['informazioni']['etàMin'] = {$lte: informazioni['etàMax']};
        }
        if(informazioni['durataMin']){
          mongo_query['informazioni'] = mongo_query['informazioni'] || {};
          mongo_query['informazioni']['durataMax'] = {$gte: informazioni['durataMin']};
        }
        if(informazioni['durataMax']){
          mongo_query['informazioni'] = mongo_query['informazioni'] || {};
          mongo_query['informazioni']['durataMin'] = {$lte: informazioni['durataMax']};
        }
        if(informazioni['giocatoriMin']){
          mongo_query['informazioni'] = mongo_query['informazioni'] || {};
          mongo_query['informazioni']['giocatoriMax'] = {$gte: informazioni['giocatoriMin']};
        }
        if(informazioni['giocatoriMax']){
          mongo_query['informazioni'] = mongo_query['informazioni'] || {};
          mongo_query['informazioni']['giocatoriMin'] = {$lte: informazioni['giocatoriMax']};
        }
        if(informazioni['giocatoriPerSquadra']){
          mongo_query['informazioni'] = mongo_query['informazioni'] || {};
          mongo_query['informazioni']['giocatoriPerSquadra'] = informazioni['giocatoriPerSquadra'];
        }
        if(informazioni['numeroSquadre']){
          mongo_query['informazioni'] = mongo_query['informazioni'] || {};
          mongo_query['informazioni']['numeroSquadre'] = informazioni['numeroSquadre'];
        }
      }
      if(autore){
        mongo_query['autore'] = new mongoose.Types.ObjectId(autore);
      }
      if(ultimaModificaMin){
        mongo_query['ultimaModifica'] = {$gte: ultimaModificaMin};
      }
      if(ultimaModificaMax){
        mongo_query['ultimaModifica'] = {$lte: ultimaModificaMax};
      }
      if(mediaValutazioniMin){
        mongo_query['mediaValutazioni'] = {$gte: mediaValutazioniMin};
      }
      if(mediaValutazioniMax){
        mongo_query['mediaValutazioni'] = {$lte: mediaValutazioniMax};
      }
      if(numeroSegnalazioniMin){
        mongo_query['numeroSegnalazioni'] = {$gte: numeroSegnalazioniMin};
      }
      if(numeroSegnalazioniMax){
        mongo_query['numeroSegnalazioni'] = {$lte: numeroSegnalazioniMax};
      }
      

      // TODO: etichette
      /*if(informazioni['etichette']){
        query['etichette'] = {$all: informazioni['etichette']};
      }*/
      
        
      // Trova tutte le etichette
      var catalogo = await Attivita.find(mongo_query)
      .limit(limit)
      .skip(limit*page)
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

        // TODO: Aggiungi controlli e etichetta proposta

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

