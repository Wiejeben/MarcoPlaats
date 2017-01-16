const Model = require('./../Helpers/Model');

module.exports = class Image extends Model {
    constructor() {
        super('Images', schemas.Image)
    }
};
