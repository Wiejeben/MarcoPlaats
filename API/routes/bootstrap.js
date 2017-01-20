require('./users');
require('./categories');
require('./products');
require('./auth');
require('./orders');

app.get('/', function(req, res, next) {
    res.send(app.name + ' is up and running!')
});