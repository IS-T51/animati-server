'use strict';

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
    return database.connect('test')
        .then(async () => {
            await database.createCollections();
        });

}, 10000)

afterAll(async () => {
    await database.disconnect();
    server.close();
})


describe('GET /ping', () => {

    //unico caso: se il server è attivo ping deve avere successo
    test('Default', async () => {
        const output = {
            "messaggio": "PONG",
            "codice": 200
        };

        const response = await request(app).get('/ping');
        expect(response.status).toEqual(200);
        expect(JSON.parse(response.text)).toEqual(expect.objectContaining(output));
    })
})






