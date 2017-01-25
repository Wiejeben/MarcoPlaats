const Authenticatable = require('./Authenticatable'),
    Product = require('./Product'),
    Order = require('./Order');

module.exports = class User extends Authenticatable {
    constructor() {
        super('Users', schemas.User)
    }

    insertProduct(productId) {
        return this.collection.update(
            { _id: this.document._id },
            { $addToSet: { ProductIds: productId } }
        )
    }

    insertOrder(orderId) {
        return this.collection.update(
            { _id: this.document._id },
            { $addToSet: { Orders: orderId } }
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

    getForeignOrders(userId, property) {
        return this.findById(userId)
            .then(user => {
                let objectIds = user.Orders.map(item => {
                    item = new ObjectId(item);
                    return item
                })
                // return new Order().collection.find({_id: { "$in":objectIds }}).toArray();

                return new Order().collection.aggregate([
                    {
                        // $match: { _id: { $in: user[property] } }
                        $match: { _id: { $in: objectIds } }
                    },
                    {
                        $unwind: {
                            path: '$OrderLines',
                        }
                    },
                    {
                        $lookup: {
                            from: 'Products',
                            localField: 'OrderLines.ProductId',
                            foreignField: '_id',
                            as: 'Products'
                        }
                    },
                    {
                        $unwind: {
                            path: '$Products',
                        }
                    },
                    {
                        $group: {
                            _id: '$_id',
                            Amount: { $sum: '$OrderLines.Amount' },
                            TotalPrice: { $sum: { $multiply: ['$Products.Price', '$OrderLines.Amount'] } },
                            Products: {
                                $push: {
                                    'product': '$Products',
                                    'amount': '$OrderLines.Amount',
                                    'basePrice': '$Products.Price',
                                    'totalPrice': { $multiply: ['$Products.Price', '$OrderLines.Amount'] }
                                }
                            },
                        }
                    },

                ]).toArray()
            })
            .then(orders => {
                console.log(orders)
                return Promise.resolve(orders)
            })
            .catch(Promise.reject)
    }
};
