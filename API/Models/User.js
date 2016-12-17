const Authenticatable = require('./Authenticatable'),
    Product = require('./Product');

module.exports = class User extends Authenticatable {
    constructor() {
        super('Users', schemas.User)
    }

    /**
     * Insert product into specified category.
     *
     * @param {string} productId
     * @return {Promise}
     */
    insertProduct(productId) {
        return this.collection.updateOne(
            { _id: new ObjectId(this.document._id) },
            {
                $addToSet: {
                    ProductIds: new ObjectId(productId)
                }
            })
    }

    /**
     * Removes product from all categories.
     *
     * @param {string} productId
     * @return {Promise}
     */
    deleteProduct(productId) {
        return this.collection.updateOne(
            { ProductIds: { $in: [new ObjectId(productId)] } },
            {
                $pull: {
                    ProductIds: { $in: [new ObjectId(productId)] }
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
                    .then(products => {
                        return Promise.resolve(products)
                    })
                    .catch(Promise.reject)
            })
            .catch(Promise.reject)
    }
};
