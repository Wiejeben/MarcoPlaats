const Model = require('./Model'),
	schemas = require('./Schemas.js');

module.exports = class Category extends Model {
	constructor() {
		super('Categories', schemas.Category);
	}

	/**
	 * Get specified aggregated (with projects) document by id.
	 *
	 * @param {string} id
	 * @return {Promise}
	 */
	findById(id) {
		// Clear current document
		this.document = null;

		if (!this.validateId(id)) return Promise.reject(new Error('Invalid ObjectId'));

		return this.collection.aggregate([
			{ $match: { _id: new ObjectId(id) } },
			{ $unwind: '$ProductIds' },
			{
				$lookup: {
					from: 'Products',
					localField: 'ProductIds',
					foreignField: '_id',
					as: 'productObjects'
				}
			},
			{ $unwind: '$productObjects' },
			{
				$group: {
					_id: '$_id',
					Name: { $push: '$Name' },
					ProductObjects: { $push: '$productObjects' }
				}
			},
			{ $unwind: '$Name' }
		]).toArray()
	}
};

// Category.InsertProduct = function(db, categoryId, productId, callback) {
//     var collection = db.collection('Categories');
//
//     collection.update({_id: new ObjectId(categoryId)},
//                         {$addToSet: {ProductIds: new ObjectId(productId)}},
//                         function(err, r){
//                             callback();
//                         });
// }
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