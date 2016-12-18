const mongodb = require('mongodb'),
    logger = require('morgan');

global.config = require('./config');
global.restify = require('restify');
global.passport = require('passport-restify');
global.app = restify.createServer(config.Application);

// Allow custom authorization header
restify.CORS.ALLOW_HEADERS.push('authorization');

// Configure authentication
require('./passport');

// Server setup
app.pre(restify.pre.sanitizePath());
app.use(logger('dev'));
app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(restify.queryParser());
app.use(passport.initialize());
app.use(restify.CORS());
app.use(require('./Models/User').canBeAuthenticated);

global.ObjectId = mongodb.ObjectId;
mongodb.MongoClient.connect(config.Database.Url, { promiseLibrary: Promise }, function(err, _db) {
    if (err) {
        console.error(err.toString());
        process.exit();
    }

    global.db = _db;

    // Initialize routes
    require('./routes/bootstrap');

    // Start app
    app.listen(8080, function() {
        console.log('%s listening at %s', app.name, app.url);
    })
});
