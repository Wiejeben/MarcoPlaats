const RestRouter = require('./../Helpers/RestRouter'),
    UserController = require('./../Controllers/UserController');

// Resourceful routes
RestRouter(server, 'users', UserController);

// Current user
server.get('/auth/user', UserController.showByToken);

// Wishlist
server.get('/users/:id/wishlist', (req, res, next) => {
    return new UserController(req, res, next).getWishList()
});

server.get('/users/:id/products', (req, res, next) => {
    return new UserController(req, res, next).getProducts()
});

server.get('/users/:id/favorites', (req, res, next) => {
    return new UserController(req, res, next).getFavorites()
});
