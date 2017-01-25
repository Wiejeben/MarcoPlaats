const mongodb = require('mongodb'),
    logger = require('morgan');

require('dotenv').config();

if (typeof global.integration == "undefined") {
    global.integration = false;
}



global.config = require('./config');
global.restify = require('restify');
global.passport = require('passport-restify');
global.app = restify.createServer({ name: config.AppName + ' ' + config.AppVersion });

// Allow custom authorization header
restify.CORS.ALLOW_HEADERS.push('authorization');

// Configure authentication
require('./passport');

// Server setup
app.pre(restify.pre.sanitizePath());
if (!global.integration) {
    app.use(logger('dev'));
}
app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(restify.queryParser());
app.use(passport.initialize());
app.use(restify.CORS());
app.use(require('./Models/User').canBeAuthenticated);

global.ObjectId = mongodb.ObjectId;
mongodb.MongoClient.connect(process.env.DB_STRING, { promiseLibrary: Promise }, function(err, _db) {
    if (err) {
        console.error(err.toString());
        process.exit(1)
    }

    global.db = _db;

    // Initialize routes
    require('./routes/bootstrap');

    // Start app
    if (!global.integration) {
        app.listen(process.env.API_PORT, function() {
            console.log('%s listening at %s', app.name, app.url)
        })
    }
});