const RestfulController = require('./../Helpers/RestfulController'),
      OrderModel = require('./../Models/Order');

module.exports = class OrderController extends RestfulController {
    constructor(req, res, next) {
        super(OrderModel, req, res, next)
    }
};
