var restify = require('restify'),
    MongoClient = require('mongodb').MongoClient,
    passport = require('passport-restify'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var AutoLoader = require('./Helpers/AutoLoader');
var RestRouter = require('./Helpers/RestRouter');

var User = require('./Models/User');

// Config settings
var Config = require('./config');

// Create restify server
var server = restify.createServer({
    name:'MarcoPlaats API',
    version: '1.0.0'
});

server.use(restify.fullResponse())
      .use(restify.bodyParser())
      .use(restify.queryParser())
      .use(passport.initialize());

// Create MongoDb connection pool and start the application
// after the database connection is ready
MongoClient.connect(Config.Database.Url, { promiseLibrary: Promise }, function(err, _db) {
    server.locals = {
        db: _db
    };
});


passport.use(new GoogleStrategy({
        clientID: "410268495427-8i08t1h9qas8n13c1ngk9oeo8vfr2fb7.apps.googleusercontent.com",
        clientSecret: "tL7PbeaGz6z-FupnCP4PIZ1h",
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.InsertFromGoogle(server.locals.db, profile, function(Oauth){
            console.log('before headers');
            return done(null, 'Oauth');    
        });
    }
));



passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

server.get('/auth', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }));

server.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure', session: false }),
    function(req, res) {
        console.log('after headers');
        res.statusCode = 302;
        res.setHeader('Location', 'http://marcoplaats.maarten.co.uk?token=' + req.user.token);
        res.setHeader('Content-Length', '0');
        res.end();
    });

var controllers = AutoLoader('Controllers');


RestRouter(server, 'products', controllers.ProductController);
RestRouter(server, 'users', controllers.UserController);
RestRouter(server, 'categories', controllers.CategoryController);
RestRouter(server, 'users/:uid/orders', controllers.OrderController);
RestRouter(server, 'users/:uid/wishlist', controllers.WishlistController);
// RestRouter(server, 'users/:uid/favorites', controllers.FavoritesController);




server.get('/', function (req, res, next){
    res.send('NodeJS is up and running!');
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});