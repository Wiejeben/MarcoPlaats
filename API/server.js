// Configuration
global.config = require('./config');

// Server
const restify = require('restify'),
	mongodb = require('mongodb'),
	passport = global.passport = require('passport-restify');

require('./auth');

// Restify server
global.server = restify.createServer(config.Application);

// Allow custom headers
restify.CORS.ALLOW_HEADERS.push('authorization');

// Implement the following plugins
server.use(restify.fullResponse())
      .use(restify.bodyParser())
      .use(restify.queryParser())
      .use(passport.initialize())
      .use(restify.CORS());

// MongoDB
global.ObjectId = mongodb.ObjectId;
mongodb.MongoClient.connect(config.Database.Url, { promiseLibrary: Promise }, function (err, _db) {
	if (err) {
		console.error('Unable to connect to MongDB.');
		process.exit();
	}

	global.db = _db;
});

require('./routes');

global.server.listen(8080, function () {
	console.log('%s listening at %s', server.name, server.url);
});
