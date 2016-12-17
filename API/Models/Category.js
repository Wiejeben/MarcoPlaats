const Model = require('./Model'),
    schemas = require('./Schemas.js');

module.exports = class Category extends Model {
    constructor() {
        super('Categories', schemas.Category);
    }

    /**
     * Automatically fill in references.
     *
     * @param {object} [filter={}]
     * @return {Promise}
     */
    findWithAggregation(filter = {}) {
        return this.collection.aggregate([
            { $match: filter },

            {
                $unwind: {
                    path: '$ProductIds',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'Products',
                    localField: 'ProductIds',
                    foreignField: '_id',
                    as: 'Products'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    Name: { $first: '$Name' },
                    ProductIds: { $push: '$ProductIds' },
                    Products: { $addToSet: '$Products' }
                }
            }
        ]).toArray().then(results => {
            // Map reduce
            results.forEach(result => {
                let products = [];

                result.Products.forEach(product => {
                    if (product.length) {
                        products.push(product[0])
                    }
                });

                result.Products = products
            });

            return Promise.resolve(results)
        }).catch(Promise.reject)
    }

    /**
     * Insert product into specified category.
     *
     * @param {string} categoryId
     * @param {string} productId
     * @return {Promise}
     */
    insertProduct(categoryId, productId) {
        return this.collection.findOneAndUpdate(
            { _id: new ObjectId(categoryId) },
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
};
