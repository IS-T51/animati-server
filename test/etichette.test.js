'use strict';


const Etichetta = require('../src/models/Etichetta');
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
    await Etichetta.deleteMany();
    await Utente.deleteMany();
    return Promise.all([
        database.disconnect(),
        server.close()
    ])
})

beforeEach(async () => {
    await Etichetta.deleteMany();
    await Utente.deleteMany();
})

describe('GET /etichette', () => {    
    test('nessuna etichetta', async () => {
        const output = {
            "messaggio": "nessuna etichetta trovata"
        }
        const response = await request(app).get('/etichette');
    
        expect(response.status).toEqual(204);
    });

    test('ci sono etichette', async () => {
        await Etichetta.create({
            "descrizione": "descrizione",
            "categoria": "categoria",
            "nome": "nome"});

        const response = await request(app).get('/etichette');

        expect(response.status).toEqual(200);
    })
})

describe('POST /etichette', () => {
    test('non autenticato', async() => {

        const response = await request(app).post('/etichette')

        expect(response.status).toEqual(401);
    })

    test('non amministratore', async() => {
        await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400"},
            { upsert: true, new: true }
        ).exec();

        var etichetta = {
            "descrizione": "descrizione",
            "categoria": "categoria",
            "nome": "nome"
        }

        UtenteService.getUtente.mockImplementation(req => {
            return new Promise(function (resolve, reject) {
                resolve({
                    email: "anonimo1@animati.app",
                    immagine: "https://picsum.photos/700/400",
                    ruolo: "autenticato"
                })
            })
        })
        

        const response = await request(app)
            .post('/etichette')
            .set('Authorization', 'Bearer token')
            .send(etichetta)

        expect(response.status).toEqual(403);
    })
    
    test('aggiungi etichetta', async() => {
        await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "amministratore" },
            { upsert: true, new: true }
        ).exec();

        var etichetta = {
            "descrizione": "descrizione",
            "categoria": "categoria",
            "nome": "nome"
        }

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
            .post('/etichette')
            .set('Authorization', 'Bearer token')
            .send(etichetta)

        expect(response.status).toEqual(201);
    })

    test('aggiungi etichetta', async() => {
        await Etichetta.create({
            "descrizione": "descrizione",
            "categoria": "categoria",
            "nome": "nome"
        })
        
        await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "amministratore" },
            { upsert: true, new: true }
        ).exec();

        var etichetta = {
            "descrizione": "descrizione",
            "categoria": "categoria",
            "nome": "nome"
        }

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
            .post('/etichette')
            .set('Authorization', 'Bearer token')
            .send(etichetta)

        expect(response.status).toEqual(200);
    })
    
})