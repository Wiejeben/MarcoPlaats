const Model = require('./Model'),
    Category = require('./Category'),
    User = require('./User'),
    schemas = require('./Schemas.js');

module.exports = class Product extends Model {
    constructor() {
        super('Products', schemas.Product);
        this.hasCreatedAt = true
    }

    /**
     * Insert and assign to category and user.
     *
     * @return {Promise}
     */
    insert() {
        // Validate category id before inserting product
        const categoryId = this.document.Category;
        if (!this.validateId(categoryId)) return Promise.reject(new Error('Invalid or missing category ObjectId'));

        const promise = super.insert();

        promise.then(() => {
            // Apply to category
            const category = new Category();
            category.insertProduct(categoryId, this.document._id);

            // Apply to logged in user
            if (typeof loggedInUser !== 'undefined') {
                loggedInUser.insertProduct(this.document._id)
            }
        });

        return promise
    }

    destroy() {
        const promise = super.destroy();

        // Remove from categories and users
        promise.then(result => {
            new Category().deleteProduct(this.document._id);
            new User().deleteProduct(this.document._id)
        });

        return promise
    }

    /**
     * Get array of products based on an array of ObjectIds.
     *
     * @param {string[]} productIds
     * @return {Promise}
     */
    findManyById(productIds) {
        return this.find({ _id: { $in: productIds } })
    }
};
