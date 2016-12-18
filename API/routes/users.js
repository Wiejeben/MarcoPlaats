const RestRouter = require('./../Helpers/RestRouter'),
    UserController = require('./../Controllers/UserController');

// Resourceful routes
RestRouter('users', UserController);

// Current user
app.get('/auth/user', UserController.showByToken);

// Wishlist
app.get('/users/:id/wishlist', (req, res, next) => {
    return new UserController(req, res, next).getWishList()
});

app.get('/users/:id/products', (req, res, next) => {
    return new UserController(req, res, next).getProducts()
});

app.get('/users/:id/favorites', (req, res, next) => {
    return new UserController(req, res, next).getFavorites()
});
