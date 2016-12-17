const User = require('./User'),
    BaseModel = require('./BaseModel');

module.exports = class Favorite extends BaseModel {
    /**
     * @property {object} hostDocument
     */
    constructor() {
        super('Products');
        this.hostDocument = {}
    }

    /**
     * Get all wishlist items from specified user.
     *
     * @return {Promise}
     */
    all() {
        const user = new User();
        return user.findById(this.params.uid).then(result => {
            return this.find({ _id: { $in: result.FavoriteProductIds } })
        })
    }
};
