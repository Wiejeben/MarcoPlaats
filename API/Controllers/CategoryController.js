const RestfulController = require('./../Helpers/RestfulController'),
    CategoryModel = require('./../Models/Category');

module.exports = class CategoryController extends RestfulController {
    constructor(req, res, next) {
        super(CategoryModel, req, res, next)
    }

    show() {
        this.model.useAggregation = true;
        super.show();
    }
};
