const RestRouter = require('./../Helpers/RestRouter'),
    UserController = require('./../Controllers/UserController');

// Resourceful routes
RestRouter(server, 'users', UserController);

// Current user
server.get('/auth/user', UserController.showByToken);

// Wishlist
server.get('/users/:uid/wishlist', (req, res, next) => {
    return new UserController().getWishList(req, res, next)
});

server.get('/users/:uid/products', (req, res, next) => {
    return new UserController().getProducts(req, res, next)
});

server.get('/users/:uid/favorites', (req, res, next) => {
    return new UserController().getFavorites(req, res, next)
});
