const RestfulController = require('./../Helpers/RestfulController'),
    Product = require('./../Models/Product');

module.exports = class ProductController extends RestfulController {
    constructor() {
        super(Product)
    }
};
