const RestfulController = require('./RestfulController'),
	CategoryModel = require('./../Models/Category');

module.exports =

class CategoryController extends RestfulController {
	constructor() {
		super(CategoryModel)
	}
};