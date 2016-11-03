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

// Implement the following plugins
server.use(restify.fullResponse())
    .use(restify.bodyParser())
    .use(restify.queryParser())
    .use(passport.initialize());

// MongoDB
require('mongodb').MongoClient.connect(config.Database.Url, { promiseLibrary: Promise }, function(err, _db) {
    console.log(err);
    server.locals = {
        db: _db
    };
});

require('./routes');

global.server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

