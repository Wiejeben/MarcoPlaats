const Model = require('./../Helpers/Model'),
    _ = require('lodash'),
    User = require('./User'),
    schemas = require('./../schemas.js'),
    Product = require('./Product');

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
        // Sanitize order lines
        this.document.OrderLines = this.document.OrderLines.map(item => this.sanitize(item, schemas.OrderLines))
        this.document.OrderLines = this.document.OrderLines.map(item => {
            item.ProductId = new ObjectId(item.ProductId);
            return item
        });

        if (loggedInUser !== undefined) {
            this.document.userId = loggedInUser.document._id
        }

        // Current date
        this.document.OrderDate = new Date();

        // Sanitise order
        this.document = this.sanitize(this.document, schemas.Order);

        const promise = this.collection.insertOne(this.document);

        promise.then(() => {
            // Apply to logged in user
            if (loggedInUser !== undefined) {
                loggedInUser.insertOrder(this.document._id)
            }

            // Update product stock
            this.document.OrderLines.forEach(value => {
                const product = new Model('Products', schemas.Product);

                product.findById(value.ProductId)
                    .then(() => {
                        let amount = product.document.Amount - value.Amount;

                        // Prevent negative stock
                        if (amount <= 0) {
                            amount = 0;
                        }

                        product.document.Amount = amount;

                        product.update()
                    })
            });
        });

        return promise
    }
};
