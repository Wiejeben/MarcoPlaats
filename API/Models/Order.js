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
        
        this.document.OrderLines = this.document.OrderLines.map(item => this.sanitize(item, schemas.OrderLines))
        this.document.OrderLines = this.document.OrderLines.map(item => { item.ProductId = new ObjectId(item.ProductId); return item } )

        if (typeof loggedInUser !== 'undefined') {
            this.document.userId = loggedInUser.document._id
        }
        this.document.OrderDate = new Date();
        this.document = this.sanitize(this.document, schemas.Order)

        // loggedInUser
        const promise = this.collection.insertOne(this.document);

        // // Validate category id before inserting product
        // const categoryId = this.document.Category
        // if (!this.validateId(categoryId)) return Promise.reject(new restify.BadRequestError('Invalid or missing category ObjectId'))
        
        // const proimse =  this.collection.inserOne(this.document)

        promise.then(() => {
            // Apply to logged in user
            if (typeof loggedInUser !== 'undefined') {
                loggedInUser.insertOrder(this.document._id)
            }
        })

        return promise
    }
};
