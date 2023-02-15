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
exports.aggiornaCatalogo = function (data) {

  return new Promise(async function (resolve, reject) {
    try {

      if (new Date(data) > new Date()) {
        return reject(utils.respondWithCode(400, {
          "messaggio": "Data invalida",
          "codice": 400
        }));
      }

      var aggiornati = await Attivita.find(
        { ultimaModifica: { $gte: data } }
      ).exec();


      if (aggiornati?.length) {
        return resolve(aggiornati);
      } else {
        return resolve(utils.respondWithCode(204, {
          "messaggio": "Nessuna attività da aggiornare",
          "codice": 204
        }));
      }
    } catch (err) {
      reject(utils.respondWithCode(500, {
        "messaggio": "Errore interno",
        "codice": 500,
        "errore": err
      }));
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
exports.aggiungiAttivita = function (req, body) {
  return new Promise(async function (resolve, reject) {

    // Verifico che l'utente sia autenticato
    UtenteService.getUtente(req).then(async function (io) {

      // Verifico che le informazioni fornite siano valide
      verificaCorrettezzaAttivita(io, body).then(async () => {
        console.log(body);
        var attivita = await new Attivita(body);
        attivita.autore = io._id;
        await attivita.save();

        return resolve(utils.respondWithCode(201, {
          "messaggio": "Attività aggiunta",
          "codice": 201,
          "attività": attivita
        }));

      }
      ).catch(reject);

    }).catch(function (response) {
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
exports.aggiungiSegnalazione = function (req, body, id) {
  return new Promise(async function (resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function (io) {
      try {
        // Verifica che l'attività esista
        var attivita = await Attivita.findById(id).exec();
        if (!attivita) {
          return reject(utils.respondWithCode(404, {
            "messaggio": "Attività non trovata",
            "codice": 404
          }));
        }
        // Ottieni la segnalazione
        var segnalazione = new Segnalazione(
          { autore: io._id, attività: attivita._id, titolo: body.titolo, messaggio: body.messaggio }
        )
        // Salva la segnalazione
        await segnalazione.save();

        // Se ce ne sono, restituisci 200, altrimenti 201
        if (segnalazione) {
          return resolve({
            "messaggio": "Segnalazione aggiornata",
            "codice": 200
          });
        } else {
          resolve(utils.respondWithCode(201, {
            "messaggio": "Segnalazione aggiunta",
            "codice": 201
          }));
        }
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio": "Errore interno",
          "codice": 500,
          "errore": err
        }));
      }
    }).catch(function (response) {
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
exports.aggiungiValutazione = function (req, body, id) {
  return new Promise(async function (resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function (io) {
      try {
        // Verifica che l'attività esista
        var attivita = await Attivita.findById(id).exec();
        if (!attivita) {
          return reject(utils.respondWithCode(404, {
            "messaggio": "Attività non trovata",
            "codice": 404
          }));
        }
        // Ottieni la valutazione
        var valutazione = await Valutazione.findOneAndUpdate(
          { autore: io._id, attività: attivita._id },
          { autore: io._id, attività: attivita._id, voto: body.voto },
          { upsert: true, new: false, runValidators: true }).exec();

        // Se ce ne sono, restituisci 200, altrimenti 201
        if (valutazione) {
          return resolve({
            "messaggio": "Valutazione aggiornata",
            "codice": 200
          });
        } else {
          resolve(utils.respondWithCode(201, {
            "messaggio": "Valutazione aggiunta",
            "codice": 201
          }));
        }
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio": "Errore interno",
          "codice": 500,
          "errore": err
        }));
      }
    }).catch(function (response) {
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
exports.getAttivita = function (id) {
  return new Promise(async function (resolve, reject) {
    try {
      // Trova tutte le etichette
      var attivita = await Attivita.findById(id).exec();

      // Se non esiste, restituisci 404
      if (!attivita) {
        reject(utils.respondWithCode(404, {
          "messaggio": "Attivita non trovata",
          "codice": 404
        }));
      }

      resolve(attivita);
    } catch (err) {
      reject(utils.respondWithCode(500, {
        "messaggio": "Errore interno",
        "codice": 500,
        "errore": err
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
exports.getCatalogo = function (informazioni, autore, ultimaModificaMin, ultimaModificaMax, mediaValutazioniMin, mediaValutazioniMax, numeroSegnalazioniMin, numeroSegnalazioniMax, pagina, limite) {
  return new Promise(async function (resolve, reject) {
    try {
      let mongo_query = {};
      let limit = limite || 50;
      let page = pagina || 0;

      if (informazioni) {
        if(informazioni['descrizione']?.length > 50){
          return reject(utils.respondWithCode(400, {
            "messaggio": "Informazioni non valide",
            "codice": 400,
            "errore": "L'espressione da cercare nella descrizione può avere massimo 50 caratteri"
          }));
        }

        if ((informazioni['etàMin'] > informazioni['etàMax']) || (informazioni['durataMin'] > informazioni['durataMax']) || (informazioni['giocatoriMin'] > informazioni['giocatoriMax'])) {
          return reject(utils.respondWithCode(400, {
            "messaggio": "Informazioni non valide",
            "codice": 400,
            "errore": "Intervalli non validi"
          }));
        }

        if (informazioni['titolo']) {
          mongo_query['informazioni.titolo'] = { $regex: informazioni['titolo'], $options: 'i' };
        }
        if (informazioni['descrizione']) {
          mongo_query['informazioni.descrizione'] = { $regex: informazioni['descrizione'], $options: 'i' };
        }
        //il range di età dei partecipanti dev'essere compreso nel range di età per cui è consigliata l'attività
        if (informazioni['etàMin']) {
          mongo_query['informazioni.etàMin'] = { $lte: informazioni['etàMin'] };
        }
        if (informazioni['etàMax']) {
          mongo_query['informazioni.etàMax'] = { $gte: informazioni['etàMax'] };
        }
        //il range di durata dell'attività deve almeno intersecare il range di tempo a disposizione
        if (informazioni['durataMin']) {
          mongo_query['informazioni.durataMax'] = { $gte: informazioni['durataMin'] };
        }
        if (informazioni['durataMax']) {
          mongo_query['informazioni.durataMin'] = { $lte: informazioni['durataMax'] };
        }
        //il range di partecipanti dev'essere compreso nel range di partecipanti per cui è consigliata l'attività
        if (informazioni['giocatoriMin']) {
          mongo_query['informazioni.giocatoriMin'] = { $lte: informazioni['giocatoriMin'] };
        }
        if (informazioni['giocatoriMax']) {
          mongo_query['informazioni.giocatoriMax'] = { $gte: informazioni['giocatoriMax'] };
        }
        if (informazioni['giocatoriPerSquadra']) {
          mongo_query['informazioni.giocatoriPerSquadra'] = informazioni['giocatoriPerSquadra'];
        }
        if (informazioni['numeroSquadre']) {
          mongo_query['informazioni.numeroSquadre'] = informazioni['numeroSquadre'];
        }


        //etichette
        if (informazioni['etichette']) {

          var etichette = [];
          var etichetteString = informazioni['etichette'];
          await Promise.all(etichetteString.map(async function (nomeEtichetta) {
            var etichetta = await Etichetta.findOne({ nome: nomeEtichetta });
            if (!etichetta) {
              return reject(utils.respondWithCode(400, {
                "messaggio": "Informazioni non valide",
                "codice": 400,
                "errore": ("Etichetta inesistente: " + nomeEtichetta)
              }));
            }
            etichette.push(etichetta);
          }));

          informazioni['etichette'] = etichette.map(e => {
            return { $elemMatch: e }
          });
          mongo_query['informazioni.etichette'] = { $all: informazioni['etichette'] };

        }

      }

      if ((ultimaModificaMin > ultimaModificaMax) || (mediaValutazioniMin > mediaValutazioniMax) || (numeroSegnalazioniMin > numeroSegnalazioniMax)) {
        return reject(utils.respondWithCode(400, {
          "messaggio": "Informazioni non valide",
          "codice": 400,
          "errore": "Intervalli non validi"
        }));
      }

      if (autore) {
        mongo_query['autore'] = new mongoose.Types.ObjectId(autore);
      }
      if (ultimaModificaMin) {
        if (new Date(ultimaModificaMin) > new Date()) {
          return reject(utils.respondWithCode(400, {
            "messaggio": "Data invalida",
            "codice": 400
          }));
        }

        mongo_query['ultimaModifica'] = { $gte: ultimaModificaMin };
      }
      if (ultimaModificaMax) {
        // va bene anche se è futura

        mongo_query['ultimaModifica'] = { $lte: ultimaModificaMax };
      }
      if (mediaValutazioniMin) {
        mongo_query['mediaValutazioni'] = { $gte: mediaValutazioniMin };
      }
      if (mediaValutazioniMax) {
        mongo_query['mediaValutazioni'] = { $lte: mediaValutazioniMax };
      }
      if (numeroSegnalazioniMin) {
        mongo_query['numeroSegnalazioni'] = { $gte: numeroSegnalazioniMin };
      }
      if (numeroSegnalazioniMax) {
        mongo_query['numeroSegnalazioni'] = { $lte: numeroSegnalazioniMax };
      }


      // Trova tutte le attività
      var catalogo = await Attivita.find(mongo_query)
        .limit(limit)
        .skip(limit * page)
        .exec();

      // Se esiste, restituisci 200, altrimenti 204
      if (catalogo?.length) {
        resolve(catalogo);
      } else {
        resolve(utils.respondWithCode(204, {            // body circa inutile perché molti browser lo scartano
          "messaggio": "Nessuna attività trovata",
          "codice": 204
        }));
      }
    } catch (err) {
      console.log(err);
      reject(utils.respondWithCode(500, {
        "messaggio": "Errore interno",
        "codice": 500,
        "errore": err.message
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
exports.modificaAttivita = function (req, body, id) {
  return new Promise(async function (resolve, reject) {
    // Verifico che l'utente sia autenticato
    UtenteService.getUtente(req).then(async function (io) {

      // Verifico che l'utente sia autorizzato a modificare l'attività
      permessoModifica(io, id).then(async (attivita) => {

        // Verifico che le informazioni fornite siano valide
        verificaCorrettezzaAttivita(io, body, id).then(async () => {

          // Modifica l'attività
          attivita = await Attivita.findByIdAndUpdate(id, {
            informazioni: body.informazioni,
            banner: body.banner,
            collegamenti: body.collegamenti,
            ultimaModifica: new Date(),
          }, { new: true }).exec();

          // Restituisci 200 e l'attività aggiornata
          resolve(attivita);
        }
        ).catch(reject);
      }
      ).catch(reject);

    }).catch(function (response) {
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
exports.ottieniSegnalazioni = function (req, id) {
  return new Promise(async function (resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function (io) {
      // Se non è amministratore, restituisci 403
      if (io.ruolo != "amministratore") {
        return reject(utils.respondWithCode(403, {
          "messaggio": "Non sei autorizzato a fare questa richiesta",
          "codice": 403
        }));
      }

      try {
        // Verifica che l'attività esista
        var attivita = await Attivita.findById(id).exec();
        if (!attivita) {
          return reject(utils.respondWithCode(404, {
            "messaggio": "Attività non trovata",
            "codice": 404
          }));
        }

        // Ottieni le segnalazioni
        var segnalazioni = await Segnalazione.find({ attività: id }).exec();
        // Se ce ne sono, restituisci 200, altrimenti 204
        if (segnalazioni.length > 0) {
          return resolve(segnalazioni);
        } else {
          resolve(utils.respondWithCode(204, {
            "messaggio": "Nessuna segnalazione trovata",
            "codice": 204
          }));
        }
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio": "Errore interno",
          "codice": 500,
          "errore": err
        }));
      }
    }).catch(function (response) {
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
exports.ottieniValutazione = function (req, id) {
  return new Promise(async function (resolve, reject) {
    // Verifico che autenticato
    UtenteService.getUtente(req).then(async function (io) {
      try {
        // Verifica che l'attività esista
        var attivita = await Attivita.findById(id).exec();
        if (!attivita) {
          return reject(utils.respondWithCode(404, {
            "messaggio": "Attività non trovata",
            "codice": 404
          }));
        }
        // Ottieni la valutazione
        var valutazione = await Valutazione.findOne({ autore: io._id, attività: id }).exec();
        // Se ce ne sono, restituisci 200, altrimenti 204
        if (valutazione) {
          return resolve(valutazione);
        } else {
          resolve(utils.respondWithCode(204, {
            "messaggio": "Nessuna valutazione trovata",
            "codice": 204
          }));
        }
      } catch (err) {
        reject(utils.respondWithCode(500, {
          "messaggio": "Errore interno",
          "codice": 500,
          "errore": err
        }));
      }
    }).catch(function (response) {
      // Errore autenticazione
      return reject(response);
    });
  });
}



function permessoModifica(io, id) {
  return new Promise(async function (resolve, reject) {
    // Ottieni l'attività
    var attivita = await Attivita.findById(id).exec();

    // Se non esiste, restituisci 404
    if (!attivita) {
      return reject(utils.respondWithCode(404, {
        "messaggio": "Attività non trovata",
        "codice": 404
      }));
    }

    var isProposta = false;
    await attivita.informazioni?.etichette?.forEach(etichetta => {
      isProposta = isProposta || (etichetta.nome == 'proposta')
    });

    // Se non è amministratore e non è l'autore, restituisci 403
    if (io.ruolo != "amministratore" && (!attivita.autore.equals(io._id) || !isProposta)) {
      return reject(utils.respondWithCode(403, {
        "messaggio": "Non sei autorizzato a fare questa richiesta",
        "codice": 403
      }));
    }

    resolve(attivita);
  })
}



function verificaCorrettezzaAttivita(io, body, id) {
  return new Promise(async function (resolve, reject) {
    try {

      // controlli correttezza nuove info
      try {
        if (!body.informazioni) throw 'informazioni';
        if (!body.banner) throw 'banner';
        if (!body.informazioni.titolo) throw 'titolo';
        if (!body.informazioni.descrizione) throw 'descrizione';
        if (!body.informazioni.etàMin || !body.informazioni.etàMax) throw 'età';
        if (!body.informazioni.durataMin || !body.informazioni.durataMax) throw 'durata';
        if (!body.informazioni.giocatoriMin || !body.informazioni.giocatoriMax) throw 'giocatori';
      } catch (err) {
        return reject(utils.respondWithCode(400, {
          "messaggio": "Informazioni non valide",
          "codice": 400,
          "errore": ("Informazioni mancanti: " + err)
        }));
      }

      if ((body.informazioni.etàMin > body.informazioni.etàMax) || (body.informazioni.durataMin > body.informazioni.durataMax) || (body.informazioni.giocatoriMin > body.informazioni.giocatoriMax)) {
        return reject(utils.respondWithCode(400, {
          "messaggio": "Informazioni non valide",
          "codice": 400,
          "errore": "Intervalli non validi"
        }));
      }


      //controlli e etichetta proposta

      var isProposta = false;
      var etichette = [];
      var etichetteString = body.informazioni?.etichette || [];
      await Promise.all(etichetteString.map(async function (nomeEtichetta) {
        if (nomeEtichetta == "proposta")
          isProposta = true;
        var etichetta = await Etichetta.findOne({ nome: nomeEtichetta });
        if (!etichetta) {
          return reject(utils.respondWithCode(400, {
            "messaggio": "Informazioni non valide",
            "codice": 400,
            "errore": ("Etichetta inesistente: " + nomeEtichetta)
          }));
        }
        etichette.push(etichetta);
      }));
      if (!isProposta && io.ruolo != 'amministratore') {
        var proposta = await Etichetta.findOne(
          { nome: "proposta" }
        ).exec();
        if (!proposta) {
          proposta = new Etichetta({
            nome: 'proposta',
            descrizione: 'Questa attività è una proposta di un utente',
            categoria: 'sistema'
          });
          await proposta.save();
        }
        etichette.push(proposta);
      }
      body.informazioni.etichette = etichette;


      // cercare se è presente un'altra attività con lo stesso titolo
      var titolo = body.informazioni.titolo;
      var mongo_query = {};
      mongo_query['informazioni'] = {};
      if (id)
        mongo_query = { 'informazioni.titolo': titolo, _id: { $ne: id } };
      else
        mongo_query = { 'informazioni.titolo': titolo };
      var cloni = await Attivita.find(mongo_query).exec();

      //console.log(cloni);
      if (cloni?.length) {
        return reject(utils.respondWithCode(400, {
          "messaggio": "Titolo non valido",
          "codice": 400,
          "errore": "Esiste già un'attività con questo titolo"
        }));
      }

      resolve();

    } catch (err) {
      console.log(err);
      return reject(utils.respondWithCode(500, {
        "messaggio": "Errore interno",
        "codice": 500,
        "errore": err
      }));
    }
  })
}


