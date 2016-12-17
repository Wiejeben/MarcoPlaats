const mongodb = require('mongodb'),
    logger = require('morgan');

global.config = require('./config');
global.restify = require('restify');
global.passport = require('passport-restify');
global.server = restify.createServer(config.Application);

// Allow custom authorization header
restify.CORS.ALLOW_HEADERS.push('authorization');

// Configure authentication
require('./auth');

// Server setup
server.pre(restify.pre.sanitizePath());
server.use(logger('dev'));
server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(passport.initialize());
server.use(restify.CORS());
server.use(require('./Models/User').canBeAuthenticated);

global.ObjectId = mongodb.ObjectId;
mongodb.MongoClient.connect(config.Database.Url, { promiseLibrary: Promise }, function(err, _db) {
    if (err) {
        console.error(err.toString());
        process.exit();
    }

    global.db = _db;

    // Init routes
    require('./routes/bootstrap');

    // Open server
    server.listen(8080, function() {
        console.log('%s listening at %s', server.name, server.url);
    })
});
