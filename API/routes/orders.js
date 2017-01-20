const RestRouter = require('./../Helpers/RestRouter'),
      OrderController = require('./../Controllers/OrderController');

// Resourceful routes
RestRouter('orders', OrderController);