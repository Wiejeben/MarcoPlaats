// Configuration
global.config = require('./config');

// Server
const mongodb = require('mongodb'),
    logger = require('morgan');

global.restify = require('restify');
global.passport = require('passport-restify');

// Restify server
global.server = restify.createServer(config.Application);

// Allow custom headers
restify.CORS.ALLOW_HEADERS.push('authorization');

// Configure authentication
require('./auth');

const User = require('./Models/User');

// Implement the following plugins
server.pre(restify.pre.sanitizePath())
    .use(logger('dev'))
    .use(restify.fullResponse())
    .use(restify.bodyParser())
    .use(restify.queryParser())
    .use(passport.initialize())
    .use(restify.CORS())
    .use(User.canBeAuthenticated);

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
