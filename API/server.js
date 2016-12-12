// Configuration
global.config = require('./config');

// Server
const restify = require('restify'),
    mongodb = require('mongodb'),
    logger = require('morgan');

global.passport = require('passport-restify');

// Restify server
global.server = restify.createServer(config.Application);

// Allow custom headers
restify.CORS.ALLOW_HEADERS.push('authorization');

// Configure authentication
require('./auth');

// Implement the following plugins
server.use(logger('dev'))
    .use(restify.fullResponse())
    .use(restify.bodyParser())
    .use(restify.queryParser())
    .use(passport.initialize())
    .use(restify.CORS());

// MongoDB
global.ObjectId = mongodb.ObjectId;
mongodb.MongoClient.connect(config.Database.Url, { promiseLibrary: Promise }, function(err, _db) {
    if (err) {
        console.error(err.toString());
        process.exit();
    }

    global.db = _db;

    // Init routes
    require('./routes');

    // Open server
    server.listen(8080, function() {
        console.log('%s listening at %s', server.name, server.url);
    })
});
