const RestRouter = require('./../Helpers/RestRouter'),
    ProductController = require('./../Controllers/ProductController');

// Resourceful routes
RestRouter('products', ProductController);

app.get('/products-highest-price', (req, res, next) => {
    return new ProductController(req, res, next).getHighestPrice()
});