const Model = require('./../Helpers/Model'),
    Category = require('./Category'),
    User = require('./User'),
    schemas = require('./../schemas.js')

module.exports = class Product extends Model {
    constructor() {
        super('Products', schemas.Product)
        this.hasCreatedAt = true
    }

    /**
     * Insert and assign to category and user.
     *
     * @return {Promise}
     */
    insert() {
        // Validate category id before inserting product
        const categoryId = this.document.Category
        if (!this.validateId(categoryId)) return Promise.reject(new restify.BadRequestError('Invalid or missing category ObjectId'))

        const promise = super.insert()

        promise.then(() => {
            // Apply to category
            const category = new Category()
            category.insertProduct(categoryId, this.document._id)

            // Apply to logged in user
            if (typeof loggedInUser !== 'undefined') {
                loggedInUser.insertProduct(this.document._id)
            }
        })

        return promise
    }

    update() {
        const categoryId = this.document.Category,
              productId = this.params.id

        if (!this.validateId(categoryId)) return Promise.reject(new restify.BadRequestError('Invalid or missing category ObjectId'))

        return super.update().then(() => {
            return new Category().deleteProduct(productId)
        }).then(() => {
            return new Category().insertProduct(categoryId, productId)
        }).catch((err) => {
            return Promise.reject(err)
        })
    }

    destroy() {
        // Remove from categories and users
        return super.destroy().then(result => {
            return new Category().deleteProduct(this.document._id)
        }).then(() => {
            const User = require('./User')
            return new User().deleteProduct(this.document._id)
        }).catch((err) => {
            return Promise.reject(err)
        })
    }
}
