'use strict';


const Attivita = require('../src/models/Attivita');
const Utente = require('../src/models/Utente');
const UtenteService = require('../src/service/UtenteService');
const request = require('supertest');
const jwt = require('jsonwebtoken');
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
    await Attivita.deleteMany();
    await Utente.deleteMany();
    return Promise.all([
        database.disconnect(),
        server.close()
    ])
})

beforeEach(async () => {
    await Attivita.deleteMany();
    await Utente.deleteMany();
})

describe('GET /attivita/{id}', () => {
    test('non esiste', async() => {
        await request(app)
            .get('/attivita/63b189dbf6e4763b528548f4')
            .expect(404)
    })

    test('non valido', async() => {
        await request(app)
            .get('/attivita/id')
            .expect(400)
    })

    test('esiste', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

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
            .get('/attivita/' + attivita._id)
            .expect(200)
    })
})

describe('PUT /attivita/{id}', () => {
    test('non autenticato', async() => {
        await request(app)
            .put('/attivita/id')
            .expect(401)
    })

    test('modifica attivita', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();
        
        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
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
                  "etichette": [
                    {nome: "proposta", categoria: "categoria", descrizione: "descrizione"}
                  ],
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

        var attivita2 = {
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
            }
        }

        await request(app)
            .put('/attivita/' + attivita._id)
            .set('Authorization', 'Bearer ' + token)
            .send(attivita2)
            .expect(200)
    })
    
    test('non autorizzato', async() => {
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
                  "etichette": [
                    { nome: "proposta", descrizione: "descrizione", categoria: "categoria" }
                  ],
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
                autore: id
            }
        )
        await attivita.save();

        var attivita2 = {
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
            }
        }

        await request(app)
            .put('/attivita/' + attivita._id)
            .set('Authorization', 'Bearer ' + token)
            .send(attivita2)
            .expect(403)
    })
    
})

describe('POST /catalogo', () => {
    test('non autenticato', async () => {
        const response = await request(app).post('/catalogo')

        expect(response.status).toEqual(401);
    })
})

describe('POST /attivita/{id}/segnalazioni', () => {
    test('non autenticato', async () => {
        const response = await request(app).post('/attivita/{id}/segnalazioni')

        expect(response.status).toEqual(401);
    })
})

describe('GET /catalogo/aggiorna', () => {
    
})

/*
var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

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

        var attivita2 = {
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
*/