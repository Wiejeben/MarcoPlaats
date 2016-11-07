// server.js
'use strict';

// Configuration
var config = global.config = require('./config');

// Server
const restify = require('restify');

// Authentication
var passport = global.passport = require('passport-restify');
    require('./auth');

// Restify server
var server = global.server = restify.createServer(config.Application);

// Allow custom headers
restify.CORS.ALLOW_HEADERS.push('authorization');

// Implement the following plugins
server.use(restify.fullResponse())
    .use(restify.bodyParser())
    .use(restify.queryParser())
    .use(passport.initialize())
    .use(restify.CORS());

// MongoDB
require('mongodb').MongoClient.connect(config.Database.Url, { promiseLibrary: Promise }, function(err, _db) {
    server.locals = {
        db: _db
    };
});

require('./routes');

global.server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

