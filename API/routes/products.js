const RestRouter = require('./../Helpers/RestRouter'),
    ProductController = require('./../Controllers/ProductController');

// Resourceful routes
RestRouter(server, 'categories', ProductController);