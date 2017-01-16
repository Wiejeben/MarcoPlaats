require('./users');
require('./categories');
require('./products');
require('./auth');

app.get('/', function(req, res, next) {
    res.send(app.name + ' is up and running!')
});
