const RestRouter = require('./../Helpers/RestRouter'),
    UserController = require('./../Controllers/UserController');

// Resourceful routes
RestRouter(server, 'users', UserController);

// Current user
server.get('/auth/user', UserController.showByToken);

// Wishlist
server.get('/users/:uid/wishlist', (req, res, next) => {
    return new UserController(req, res, next).getWishList()
});

server.get('/users/:uid/products', (req, res, next) => {
    return new UserController(req, res, next).getProducts()
});

server.get('/users/:uid/favorites', (req, res, next) => {
    return new UserController(req, res, next).getFavorites()
});
