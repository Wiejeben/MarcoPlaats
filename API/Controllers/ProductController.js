const RestfulController = require('./RestfulController'),
    Product = require('./../Models/Product');

module.exports = class ProductController extends RestfulController {
    constructor() {
        super(Product)
    }
};
