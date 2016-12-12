const AutoLoader = require('./Helpers/AutoLoader');

// Hello World message
server.get('/', function(req, res, next) {
    res.send('NodeJS is up and running!');
});

// Redirect to Google
server.get('/auth', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }));

// Process callback
server.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failure', session: false }),
    function(req, res) {

        // Send user back to client
        res.statusCode = 302;
        res.setHeader('Location', global.config.Misc.ClientUrl + '/account/process.html?token=' + req.user);
        res.setHeader('Content-Length', '0');
        res.end();
    });

const controllers = AutoLoader('Controllers');

const User = require('./Models/User');


const RestRouter = require('./Helpers/RestRouter'),
    RestRouter2 = require('./Helpers/RestRouter2');

server.get('/auth/user', controllers.UserController.showByToken);
RestRouter2(server, 'users', controllers.UserController);

RestRouter2(server, 'products', controllers.ProductController);
RestRouter2(server, 'categories', controllers.CategoryController);
RestRouter(server, 'users/:uid/orders', controllers.OrderController);
RestRouter(server, 'users/:uid/wishlist', controllers.WishlistController);
RestRouter(server, 'users/:uid/favourites', controllers.FavouritesController);
RestRouter(server, 'users/:uid/products', controllers.UserProductController);
