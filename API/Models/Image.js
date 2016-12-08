const Model = require('./Model');

module.exports = class Image extends Model {
	constructor() {
		super('Images', schemas.Image)
	}
};
