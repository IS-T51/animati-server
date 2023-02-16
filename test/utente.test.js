'use strict';


const Utente = require('../src/models/Utente');
const UtenteService = require('../src/service/UtenteService');
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
    return Promise.all([
        database.disconnect(),
        server.close()
    ])
})

beforeEach(async () => {
    await Utente.deleteMany();
})

describe('GET /utente/login', () => { 
    test('login', async() => {
        const response = await request(app).get('/utente/login');

        expect(response.status).toEqual(302);
    })
})

describe('GET /utente', () => {
    test('token non valido', async() => {
        const response = await request(app).get('/utente');

        expect(response.status).toEqual(401);
    })

    test('ruolo modificato', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = {
            "token": jwt.sign(
                utente.toObject(),
                process.env.JWT_SECRET_KEY
            )
        }

        await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "amministratore" },
            { upsert: true, new: true }
        ).exec();

        const response = await request(app).get('/utente');
        expect(response.status).toEqual(401); 
    })
})