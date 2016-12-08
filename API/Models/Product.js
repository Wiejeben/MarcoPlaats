const Model = require('./Model'),
	schemas = require('./Schemas.js');

module.exports = class Product extends Model {
	constructor() {
		super('Products', schemas.Product);
		this.hasCreatedAt = true
	}
};
