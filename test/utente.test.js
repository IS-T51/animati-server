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
    await Utente.deleteMany();
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

        await request(app)
            .get('/utente/login')
            .expect(302)
    })
})

describe('GET /utente', () => {
    test('autenticazione non riuscita', async() => {
        const response = await request(app).get('/utente');

        await request(app)
            .get('/utente')
            .expect(401)
    })

    test('ruolo modificato', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "amministratore" },
            { upsert: true, new: true }
        ).exec();

        await request(app)
            .get('/utente')
            .set('Authorization', 'Bearer' + token)
            .expect(401)
    })

    test('errore token', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            "abc",
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .get('/utente')
            .set('Authorization', 'Bearer ' + token)
            .expect(401)
    })

    test('utente non esiste', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "autenticato" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await Utente.deleteMany();

        await request(app)
            .get('/utente')
            .set('Authorization', 'Bearer ' + token)
            .expect(401)
    })
})

describe('GET /utenti', () => {
    test('non amministratore', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .get('/utenti')
            .set('Authorization', 'Bearer ' + token)
            .expect(403)
    })

    test('trova utenti', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400", ruolo: "amministratore" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .get('/utenti')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })
})

describe('PATCH /utente/{id}', () => {
    test('autenticazione non riuscita', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400" },
            { upsert: true, new: true }
        ).exec();

        const response = await request(app)
            .patch('/utente/' + utente._id)
            .expect(401)
    })

    test('non amministratore', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400" },
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .patch('/utente/' + utente._id + '?ruolo=amministratore')
            .set('Authorization', 'Bearer ' + token)
            .expect(403)
    })

    test('autopromozione', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400",  ruolo: "amministratore"},
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .patch('/utente/' + utente._id + '?ruolo=autenticato')
            .set('Authorization', 'Bearer ' + token)
            .expect(403)
    })

    test('utente non trovato', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400",  ruolo: "amministratore"},
            { upsert: true, new: true }
        ).exec();

        var utente2 = await Utente.findOneAndUpdate(
            { email: "anonimo2@animati.app" },
            { email: "anonimo2@animati.app", immagine: "https://picsum.photos/700/400",  ruolo: "amministratore"},
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .patch('/utente/' + utente2._id + '?ruolo=autenticato')
            .set('Authorization', 'Bearer ' + token)
            .expect(403)
    })

    test('utente promosso ad admin', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400",  ruolo: "amministratore"},
            { upsert: true, new: true }
        ).exec();

        var utente2 = await Utente.findOneAndUpdate(
            { email: "anonimo2@animati.app" },
            { email: "anonimo2@animati.app", immagine: "https://picsum.photos/700/400",  ruolo: "autenticato"},
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .patch('/utente/' + utente2._id + '?ruolo=amministratore')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })

    test('utente promosso ad admin', async() => {
        var utente = await Utente.findOneAndUpdate(
            { email: "anonimo1@animati.app" },
            { email: "anonimo1@animati.app", immagine: "https://picsum.photos/700/400",  ruolo: "amministratore"},
            { upsert: true, new: true }
        ).exec();

        var utente2 = await Utente.findOneAndUpdate(
            { email: "anonimo2@animati.app" },
            { email: "anonimo2@animati.app", immagine: "https://picsum.photos/700/400",  ruolo: "amministratore", promossoDa: utente._id},
            { upsert: true, new: true }
        ).exec();

        const token = jwt.sign(
            utente.toObject(),
            process.env.JWT_SECRET_KEY
        )

        await request(app)
            .patch('/utente/' + utente2._id + '?ruolo=autenticato')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
    })

    //test promotore eliminato - TODO
})

//test loginGoogle - TODO