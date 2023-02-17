'use strict';

const path = require('path');
const cors = require('cors');
var oas3Tools = require('updated-oas3-tools');


// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, 'controllers')
    },
    cors: cors()
};

// Initialize the Swagger middleware
var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();


module.exports = app;
