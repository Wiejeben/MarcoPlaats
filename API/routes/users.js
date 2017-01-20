const RestRouter = require('./../Helpers/RestRouter'),
    UserController = require('./../Controllers/UserController');

// Resourceful routes
RestRouter('users', UserController);

// Authenticate
app.get('/auth/user', UserController.showByToken);

// Wishlist
app.get('/users/:userId/wishlist', (req, res, next) => {
    return new UserController(req, res, next).getWishList()
});

app.post('/users/:userId/wishlist', (req, res, next) => {
    return new UserController(req, res, next).addWishListItem()
});

app.del('/users/:userId/wishlist/:productId', (req, res, next) => {
    return new UserController(req, res, next).deleteWishListItem()
});

// Orders
app.get('/users/:userId/orders', (req, res, next) => {
    return new UserController(req, res, next).getOrders()
});

// Favorites
app.get('/users/:userId/favorites', (req, res, next) => {
    return new UserController(req, res, next).getFavorites()
});

app.post('/users/:userId/favorites', (req, res, next) => {
    return new UserController(req, res, next).addFavorite()
});

app.del('/users/:userId/favorites/:productId', (req, res, next) => {
    return new UserController(req, res, next).deleteFavorite()
});

// Products
app.get('/users/:userId/products', (req, res, next) => {
    return new UserController(req, res, next).getProducts()
});
