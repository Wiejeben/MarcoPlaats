const Model = require('./Model'),
    schemas = require('./Schemas.js'),
    Category = require('./Category');

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
};
