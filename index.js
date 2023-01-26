'use strict';

const path = require('path');
const http = require('http');
const cors = require('cors');

var oas3Tools = require('oas3-tools-cors');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, 'src/controllers')
    },
    cors: cors()
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'src/api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

const database = require('./src/utils/database');
database.connect()
.then(() => {
    database.createCollections();
});

module.exports = app;
