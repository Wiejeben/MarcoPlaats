const mongodb = require('mongodb');

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
    app.listen(process.env.API_PORT, function() {
        console.log('%s listening at %s', app.name, app.url)
    })
});
