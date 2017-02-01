const Authenticatable = require('./Authenticatable'),
    Product = require('./Product'),
    Order = require('./Order'),
    Model = require('./../Helpers/Model');

module.exports = class User extends Authenticatable {
    constructor() {
        super('Users', schemas.User);
        this.hasDeletedAt = true
    }

    insertProduct(productId) {
        return this.collection.updateOne(
            { _id: this.document._id },
            { $addToSet: { ProductIds: productId } }
        )
    }

    insertOrder(orderId) {
        return this.collection.updateOne(
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
                    [property]: productId
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
                    [property]: productId
                }
            })
    }

    getForeignOrders(userId, property) {
        return this.findById(userId)
            .then(user => {
                let objectIds = user.Orders.map(item => {
                    item = new ObjectId(item);
                    return item
                });
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
                return Promise.resolve(orders)
            })
            .catch(Promise.reject)
    }

    getSoldProducts(userId) {
        return this.findById(userId)
            .then(user => {
                let objectIds = user.ProductIds.map(item => {
                    item = new ObjectId(item);
                    return item
                });

                return new Order().collection.aggregate([
                    {
                        $match: {}
                    },
                    {
                        $unwind: {
                            path: '$OrderLines'
                        }
                    },
                    {
                        $match: { 'OrderLines.ProductId': { $in: objectIds } }
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
                        $lookup: {
                            from: 'Users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'User'
                        }
                    },
                    {
                        $unwind: '$User'
                    },
                    // {
                    //     $group: {
                    //         _id: '$_id',
                    //         OrderLines: {
                    //             $push: {
                    //                 'product': '$Products',
                    //                 'Amount': '$OrderLines.Amount',
                    //                 'OrderDate': '$OrderDate',
                    //                 'Address': '$Address',
                    //                 'User': '$User'
                    //             }
                    //         }
                    //     }
                    // },
                ]).toArray().then(soldProducts => {
                    return Promise.resolve(soldProducts)
                }).catch(Promise.reject)
            })
    }

    destroy() {
        this.sanitize();

        let id = this.params.id;

        // fallback
        if (id == null) {
            id = this.document._id;
        }

        if (!this.validateId(id)) return Promise.reject(new restify.InvalidContentError('Invalid ObjectId'));

        if(this.hasDeletedAt) {
            this.document._id = id;
            this.document.DeletedAt = Math.floor(new Date() / 1000);

            let model = new Model(this.table, this.schema);
            model.document = this.document;

            return model.update()
                .then(() => {
                    this.document.ProductIds.forEach(productId => {
                        let product = new Product();
                        product.findById(productId)
                            .then(() => {
                                if (product.document.DeletedAt == null) {
                                    //console.log('Found: ' + product.document._id + ' deleted at ' + product.document.DeletedAt);
                                    product.destroy()
                                }
                            })
                            .catch(() => {
                            });
                            //.then(() => {
                            //    if (product.document.DeletedAt == null) {
                            //        product.destroy()
                            //    }
                            //}).catch(() => {
                            //
                            //})
                    })
                })
        }

        return super.destroy({ _id: new ObjectId(id) })
    }
};
