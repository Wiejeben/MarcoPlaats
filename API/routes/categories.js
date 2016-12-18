const RestRouter = require('./../Helpers/RestRouter'),
    CategoryController = require('./../Controllers/CategoryController');

// Resourceful routes
RestRouter('categories', CategoryController);