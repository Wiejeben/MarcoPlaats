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
    find2(filter = {}) {
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
            }
        ]).toArray()
    }

    insertProduct(categoryId, productId) {
        return this.collection.updateOne(
            { _id: new ObjectId(categoryId) },
            {
                $addToSet: {
                    ProductIds: new ObjectId(productId)
                }
            });
    }
};

//
// Category.DeleteProduct = function(db, productId, callback) {
//     var collection = db.collection('Categories');
//
//     collection.findAndModify({ProductIds: {$in: [new ObjectId(productId)]}},
//                             [],
//                             { $pull: { ProductIds: { $in: [new ObjectId(productId)]}}}, function(err, r){
//                                 callback(r);
//                             });
// }
//
// module.exports = Category;