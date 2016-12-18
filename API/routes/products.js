const RestRouter = require('./../Helpers/RestRouter'),
    ProductController = require('./../Controllers/ProductController');

// Resourceful routes
RestRouter('products', ProductController);