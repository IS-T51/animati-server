'use strict';


const Attivita = require('../src/models/Attivita');
const Utente = require('../src/models/Utente');
const UtenteService = require('../src/service/UtenteService');
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

jest.mock('../src/service/UtenteService');

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
    test()
})

/*
        await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "amministratore" },
            { upsert: true, new: true }
        ).exec();
    
        UtenteService.getUtente.mockImplementation(req => {
            return new Promise(function (resolve, reject) {
                resolve({
                    email: "anonimo1@animati.app",
                    immagine: "https://picsum.photos/700/400",
                    ruolo: "amministratore"
                })
            })
        })

        const response = await request(app)
            .post('/catalogo')
            .set('Authorization', 'Bearer token')
            .send(attivita)

        expect(response.status).toEqual(403);
*/