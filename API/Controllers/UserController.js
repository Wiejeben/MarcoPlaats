const RestfulController = require('./RestfulController'),
	UserModel = require('./../Models/User');

module.exports = class UserController extends RestfulController {
	constructor() {
		super(UserModel)
	}
};
