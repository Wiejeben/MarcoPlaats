var restify = require('restify');
var MongoClient = require('mongodb').MongoClient;

var AutoLoader = require('./Helpers/AutoLoader');
var RestRouter = require('./Helpers/RestRouter');

// Config settings
var Config = require('./config');

// Create restify server
var server = restify.createServer({
    name:'MarcoPlaats API',
    version: '1.0.0'
});

server.use(restify.fullResponse())
      .use(restify.bodyParser());
      
var controllers = AutoLoader('Controllers');


RestRouter(server, 'products', controllers.ProductController);
RestRouter(server, 'users', controllers.UserController);
RestRouter(server, 'categories', controllers.CategoryController);
RestRouter(server, 'users/:uid/orders', controllers.OrderController);
RestRouter(server, 'users/:uid/wishlist', controllers.WishlistController);
// RestRouter(server, 'users/:uid/favorites', controllers.FavoritesController);


// Create MongoDb connection pool and start the application
// after the database connection is ready
MongoClient.connect(Config.Database.Url, { promiseLibrary: Promise }, function(err, _db) {
    server.locals = {
        db: _db
    };
});


server.get('/', function (req, res, next){
    res.send('Hello World!');
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});