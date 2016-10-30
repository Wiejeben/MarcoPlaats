var restify = require('restify');

var AutoLoader = require('./Helpers/AutoLoader');
var RestRouter = require('./Helpers/RestRouter');

var server = restify.createServer({
    name:'MarcoPlaats API',
    version: '1.0.0'
});

server.use(restify.fullResponse())
      .use(restify.bodyParser());

var controllers = AutoLoader('Controllers');

RestRouter(server, 'products', controllers.ProductController);
RestRouter(server, 'users', controllers.UserController);


server.get('/', function (req, res, next){
    res.send('Hello World!');
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
