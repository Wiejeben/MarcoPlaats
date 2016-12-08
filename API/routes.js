var server = global.server,
	passport = global.passport,
	RestRouter = require('./Helpers/RestRouter'),
	AutoLoader = require('./Helpers/AutoLoader');

// Hello World message
server.get('/', function(req, res, next) {

	const Category = require('./Models/Category');

	const category = new Category();

	category.findById('5848803b5f2aa11608e60670')
		.then(() => {
			console.log(category.document);
		});

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

var controllers = AutoLoader('Controllers');

var User = require('./Models/User');

server.get('/auth/user', function(req, res, next) {
	User.GetByToken(this.locals.db, req.headers.authorization, function(user) {
		res.send(user);
	});

});

RestRouter(server, 'products', controllers.ProductController);
RestRouter(server, 'users', controllers.UserController);
RestRouter(server, 'categories', controllers.CategoryController);
RestRouter(server, 'users/:uid/orders', controllers.OrderController);
RestRouter(server, 'users/:uid/wishlist', controllers.WishlistController);
RestRouter(server, 'users/:uid/favourites', controllers.FavouritesController);
RestRouter(server, 'users/:uid/products', controllers.UserProductController);
