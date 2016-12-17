require('./users');
require('./categories');
require('./products');
require('./auth');

server.get('/', function(req, res, next) {
    res.send(config.Application.name + ' is up and running!')
});
