'use strict';

const app = require('./src/app.js');
const http = require('http');
const database = require('./src/utils/database');

var serverPort = 8080;


//create server
const server = http.createServer(app);
server.listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

//connect to database
database.connect()
.then(() => {
    database.createCollections();
});


module.exports = server;