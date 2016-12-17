const RestfulController = require('./../Helpers/RestfulController'),
    CategoryModel = require('./../Models/Category');

module.exports = class CategoryController extends RestfulController {
    constructor() {
        super(CategoryModel)
    }

    show(req, res, next) {
        this.model.useAggregation = true;
        super.show(req, res, next);
    }
};
