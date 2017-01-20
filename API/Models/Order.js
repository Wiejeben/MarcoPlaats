const Model = require('./../Helpers/Model'),
    _ = require('lodash'),
    User = require('./User'),
    schemas = require('./../schemas.js'),
    Product = require('./Product')

module.exports = class Order extends Model {
    constructor() {
        super('Orders', schemas.Order)
        this.hasCreatedAt = true
    }

    sanitize(doc, schema) {
        return _.pick(_.defaults(doc, schema), _.keys(schema))
    }

    /**
     * Insert and assign to category and user.
     *
     * @return {Promise}
     */
    insert() {
        
        this.document.OrderLines = _.map(this.document.OrderLines, item => this.sanitize(item, schemas.OrderLines))
        console.log(this.document)
        
        this.document = sanitize(doc, schema)

        console.log(this.document)

        // // Validate category id before inserting product
        // const categoryId = this.document.Category
        // if (!this.validateId(categoryId)) return Promise.reject(new restify.BadRequestError('Invalid or missing category ObjectId'))

        // const promise = super.insert()

        // promise.then(() => {
        //     // Apply to category
        //     const category = new Category()
        //     category.insertProduct(categoryId, this.document._id)

        //     // Apply to logged in user
        //     if (typeof loggedInUser !== 'undefined') {
        //         loggedInUser.insertProduct(this.document._id)
        //     }
        // })

        return promise
    }

    insertProduct(productId) {
        return this.collection.update(
            {_id: this.document._id},
            {$addToSet: {ProductIds:productId}}
        )
    }

    /**
     * Removes specified product from all users.
     *
     * @param {string} productId
     * @return {Promise}
     */
    deleteProduct(productId) {
        return this.collection.updateOne(
            { ProductIds: { $in: [new ObjectId(productId)] } },
            {
                $pull: {
                    ProductIds: { $in: [new ObjectId(productId)] },
                }
            })
    }

    /**
     * @param {string} userId
     * @param {string} property
     * @return {Promise}
     */
    getForeignProducts(userId, property) {
        return this.findById(userId)
            .then(user => {
                return new Product().findManyById(user[property])
            })
            .then(products => {
                return Promise.resolve(products)
            })
            .catch(Promise.reject)
    }

    /**
     * @param {string} userId
     * @param {string} property
     * @param {string} productId
     * @return {Promise}
     */
    addForeignProduct(userId, property, productId) {
        return this.collection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $addToSet: {
                    [property]: new ObjectId(productId)
                }
            })
    }

    /**
     * @param {string} userId
     * @param {string} property
     * @param {string} productId
     * @return {Promise}
     */
    deleteForeignProduct(userId, property, productId) {
        return this.collection.updateOne(
            { _id: new ObjectId(userId) },
            {
                $pull: {
                    [property]: new ObjectId(productId)
                }
            })
    }
};
