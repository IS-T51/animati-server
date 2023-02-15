'use strict';


const Etichetta = require('../src/models/Etichetta');
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


describe('GET /etichette', () => {    
    test('nessuna etichetta', async () => {
        const output = {
            "messaggio": "essuna etichetta trovata"
        }
        const response = await request(app).get('/etichette');
    
        expect(response.status).toEqual(204);
    });
})