'use strict';


const Lista = require('../src/models/Lista');
const Attivita = require('../src/models/Attivita');
const Utente = require('../src/models/Utente');
const jwt = require('jsonwebtoken');
const request = require('supertest');
//const jwt = require('jsonwebtoken');
//const { OAuth2Client } = require('google-auth-library');
//const { google } = require('googleapis');
//const dotenv = require('dotenv');
//dotenv.config();
const http = require('http');
const app = require('../src/app.js');
const database = require('../src/utils/database');
const writer = require('../src/utils/writer');
const EtichettaSchema = require('../src/schema/Etichetta');
const serverPort = 8080;
let server;

beforeAll(() => {
    //create server
    server = http.createServer(app);
    server.listen(serverPort, function () {
        console.log('Your test server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
        console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
    });

    //connect to database
    return database.connect('test') // se voglio mettere altre robe metto await
        .then(async () => {
            await database.createCollections();
        });

}, 10000)

afterAll(async () => {
    await Lista.deleteMany();
    await Attivita.deleteMany();
    await Utente.deleteMany();
    return Promise.all([
        database.disconnect(),
        server.close()
    ])
})

beforeEach(async () => {
    await Lista.deleteMany();
    await Utente.deleteMany();
    await Attivita.deleteMany();
})


describe('GET /liste', () => {
    test('non autenticato', async() => {
        await request(app)
            .get('/liste')
            .expect(401)
    })

    test('liste non esistono, ma esiste preferiti', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .get('/liste')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })

    test('esistono liste', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await Lista.findOneAndUpdate(
            { nome: "nome", autore: utente._id },
            { nome: "nome", autore: utente._id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        ).exec();

        await request(app)
            .get('/liste')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })
})

describe('POST /liste', () => {
    test('non autenticato', async() => {
        await request(app)
            .post('/liste')
            .expect(401)
    })

    test('99 liste', async() => {

        var liste = [];
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        for(let i = 0; i < 99; i++) {
            liste[i] = Lista.findOneAndUpdate(
                { nome: "nome" + i, autore: utente._id },
                { nome: "nome" + i, autore: utente._id, ultimaModifica: new Date() },
                { upsert: true, new: true, runValidators: true }
            ).exec();
        }

        await Promise.all(liste);
        
        var lista = {
            "nome": "nome99"
        }
        await request(app)
            .post('/liste')
            .set('Authorization', 'Bearer ' + token)
            .send(lista)
            .expect(400)
    })

    test('lista esiste', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await Lista.findOneAndUpdate(
            { nome: "nome", autore: utente._id },
            { nome: "nome", autore: utente._id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        ).exec();

        var lista = {
            "nome": "nome"
        }

        await request(app)
            .post('/liste')
            .set('Authorization', 'Bearer ' + token)
            .send(lista)
            .expect(400)
    })

    test('lista non esiste', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await Lista.findOneAndUpdate(
            { nome: "nome", autore: utente._id },
            { nome: "nome", autore: utente._id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        ).exec();

        var lista = {
            "nome": "nome2"
        }

        await request(app)
            .post('/liste')
            .set('Authorization', 'Bearer ' + token)
            .send(lista)
            .expect(201)
    })
})

describe('GET /lista/{id}', () => {
    test('non autenticato', async() => {
        await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();
    
        await request(app)
            .get('/lista/id')
            .expect(401)
    })

    test('non esiste lista', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .get('/lista/63b189dbf6e4763b528548f4')
            .set('Authorization', 'Bearer ' + token)
            .expect(404)
    })

    test('non autore', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        )

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )
        
        var id;
        if (utente._id == "63b189dbf6e4763b528548f4") {
            id = "63b189dbf6e4763b528548f3";
        }
        else {
            id = "63b189dbf6e4763b528548f4";
        }

        var lista = await Lista.findOneAndUpdate(
            { nome: "nome", autore: id },
            { nome: "nome", autore: id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        )

        await request(app)
            .get('/lista/' + lista._id)
            .set('Authorization', 'Bearer ' + token)
            .expect(403)
    })
    
    test('esiste lista', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        )

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        var lista = await Lista.findOneAndUpdate(
            { nome: "nome", autore: utente._id },
            { nome: "nome", autore: utente._id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        )

        await request(app)
            .get('/lista/' + lista._id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })
})

describe('POST /lista/{id}', () => {
    test('non autenticato', async() => {
        await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();
    
        await request(app)
            .post('/lista/id')
            .expect(401)
    })

    test('non esiste lista', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .post('/lista/63b189dbf6e4763b528548f4?attivita=63b189dbf6e4763b528548f4')
            .set('Authorization', 'Bearer ' + token)
            .expect(404)
    })

    test('non autore', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )
        var id;
        if (utente._id == "63b189dbf6e4763b528548f4") {
            id = "63b189dbf6e4763b528548f3";
        }
        else {
            id = "63b189dbf6e4763b528548f4";
        }

        var lista = await Lista.findOneAndUpdate(
            { nome: "nome", autore: id },
            { nome: "nome", autore: id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        )

        await request(app)
            .post('/lista/' + lista._id + '?attivita=63b189dbf6e4763b528548f4')
            .set('Authorization', 'Bearer ' + token)
            .expect(403)
    })

    test('crea attività', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        var lista = await Lista.findOneAndUpdate(
            { nome: "nome", autore: utente._id },
            { nome: "nome", autore: utente._id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        )

        var attivita = await new Attivita(
            {
                numeroSegnalazioni: 0,
                ultimaModifica: new Date(),
                mediaValutazioni: 0,
                banner: "https://picsum.photos/700/400",
                collegamenti: [
                  {
                    "link": "http://example.com/aeiou",
                    "nome": "nome"
                  },
                  {
                    "link": "http://example.com/aeiou",
                    "nome": "nome"
                  }
                ],
                informazioni: {
                  "etàMax": 1,
                  "descrizione": "descrizione",
                  "etàMin": 1,
                  "durataMin": 1,
                  "titolo": "titolo",
                  "durataMax": 1,
                  "giocatoriPerSquadra": 1,
                  "numeroSquadre": 1,
                  "giocatoriMax": 1,
                  "giocatoriMin": 1
                },
                autore: utente._id
            }
        )
        await attivita.save();

        await request(app)
            .post('/lista/' + lista._id + '?attivita=' + attivita._id)
            .set('Authorization', 'Bearer ' + token)
            .expect(201)
    })
    
    test('troppe attività', async() => {
        var lista_attivita = [];

        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        var lista = await Lista.findOneAndUpdate(
            { nome: "nome", autore: utente._id },
            { nome: "nome", autore: utente._id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        )
        
        for(let i = 0; i < 9998; i++) {
            lista_attivita[i] = new Attivita(
                {
                    numeroSegnalazioni: 0,
                    ultimaModifica: new Date(),
                    mediaValutazioni: 0,
                    banner: "https://picsum.photos/700/400",
                    collegamenti: [
                      {
                        "link": "http://example.com/aeiou",
                        "nome": "nome"
                      },
                      {
                        "link": "http://example.com/aeiou",
                        "nome": "nome"
                      }
                    ],
                    informazioni: {
                      "etàMax": 1,
                      "descrizione": "descrizione",
                      "etàMin": 1,
                      "durataMin": 1,
                      "titolo": "titolo"+i,
                      "durataMax": 1,
                      "giocatoriPerSquadra": 1,
                      "numeroSquadre": 1,
                      "giocatoriMax": 1,
                      "giocatoriMin": 1
                    },
                    autore: utente._id
                }
            )
        }

        await Promise.all(lista_attivita);
        
        var attivita = {
            numeroSegnalazioni: 0,
            ultimaModifica: new Date(),
            mediaValutazioni: 0,
            banner: "https://picsum.photos/700/400",
            collegamenti: [
                {
                "link": "http://example.com/aeiou",
                "nome": "nome"
                },
                {
                "link": "http://example.com/aeiou",
                "nome": "nome"
                }
            ],
            informazioni: {
                "etàMax": 1,
                "descrizione": "descrizione",
                "etàMin": 1,
                "durataMin": 1,
                "titolo": "titolo9999",
                "durataMax": 1,
                "giocatoriPerSquadra": 1,
                "numeroSquadre": 1,
                "giocatoriMax": 1,
                "giocatoriMin": 1
            },
            autore: utente._id
        }

        await request(app)
            .post('/lista/' + lista._id + '?attivita=' + attivita._id)
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })


})

describe('DELETE /lista/{id}', () => {
    test('non autenticato', async() => {
        await request(app)
            .delete('/lista/id')
            .expect(401)
    })

    test('lista non esiste', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .delete('/lista/63b189dbf6e4763b528548f4')
            .set('Authorization', 'Bearer ' + token)
            .expect(404)
    })

    test('non autore', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )
        var id;
        if (utente._id == "63b189dbf6e4763b528548f4") {
            id = "63b189dbf6e4763b528548f3";
        }
        else {
            id = "63b189dbf6e4763b528548f4";
        }

        var lista = await Lista.findOneAndUpdate(
            { nome: "nome", autore: id },
            { nome: "nome", autore: id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        )

        await request(app)
            .delete('/lista/' + lista._id)
            .set('Authorization', 'Bearer ' + token)
            .expect(403)
    })

    test('elimina lista', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        var lista = await Lista.findOneAndUpdate(
            { nome: "nome", autore: utente._id },
            { nome: "nome", autore: utente._id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        )

        await request(app)
            .delete('/lista/' + lista._id)
            .set('Authorization', 'Bearer ' + token)
            .expect(204)
    })

    test('elimina preferiti', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await Lista.findByIdAndUpdate(
            utente._id,
            { $set: { autore: utente._id, nome: "Preferiti" } },
            { upsert: true, new: false }
        ).exec();

        await request(app)
            .delete('/lista/' + utente._id)
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })
})

describe('DELETE /lista/{id}/{indice}', () => {
    test('non autenticato', async() => {
        await request(app)
            .delete('/lista/id/indice')
            .expect(401)
    })

    test('lista non esiste', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .delete('/lista/63b189dbf6e4763b528548f4/1')
            .set('Authorization', 'Bearer ' + token)
            .expect(404)
    })

    test('non autore', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        )

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )
        
        var id;
        if (utente._id == "63b189dbf6e4763b528548f4") {
            id = "63b189dbf6e4763b528548f3";
        }
        else {
            id = "63b189dbf6e4763b528548f4";
        }

        var lista = await Lista.findOneAndUpdate(
            { nome: "nome", autore: id },
            { nome: "nome", autore: id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        )

        await request(app)
            .delete('/lista/' + lista._id + '/1')
            .set('Authorization', 'Bearer ' + token)
            .expect(403)
    })

    test('indice maggiore di lunghezza lista', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        )

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        var lista = await Lista.findOneAndUpdate(
            { nome: "nome", autore: utente._id },
            { nome: "nome", autore: utente._id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        )

        await request(app)
            .delete('/lista/' + lista._id + '/4')
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })

    test('rimuovi attività', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        )

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        var lista = await Lista.findOneAndUpdate(
            { nome: "nome", autore: utente._id },
            { nome: "nome", autore: utente._id, ultimaModifica: new Date() },
            { upsert: true, new: true, runValidators: true }
        )

        var attivita = await new Attivita(
            {
                numeroSegnalazioni: 0,
                ultimaModifica: new Date(),
                mediaValutazioni: 0,
                banner: "https://picsum.photos/700/400",
                collegamenti: [
                  {
                    "link": "http://example.com/aeiou",
                    "nome": "nome"
                  },
                  {
                    "link": "http://example.com/aeiou",
                    "nome": "nome"
                  }
                ],
                informazioni: {
                  "etàMax": 1,
                  "descrizione": "descrizione",
                  "etàMin": 1,
                  "durataMin": 1,
                  "titolo": "titolo",
                  "durataMax": 1,
                  "giocatoriPerSquadra": 1,
                  "numeroSquadre": 1,
                  "giocatoriMax": 1,
                  "giocatoriMin": 1
                },
                autore: utente._id
            }
        )
        await attivita.save();

        lista.attività.push(attivita);
        lista.ultimaModifica = new Date();
        await lista.save();

        await request(app)
            .delete('/lista/' + lista._id + '/0')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })
})