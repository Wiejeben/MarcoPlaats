module.exports = class Category extends require('./Model') {
    constructor() {
        super('Categories', schemas.Category);
    }
};

// var Context = require('./../Helpers/Context.js'),
//     ObjectId = require('mongodb').ObjectID;
//
// var Category = function (data) {
//     this.data = data;
// };
//
// Category.prototype.data = {};
//
// Category.prototype.changeName = function (name) {
//     this.data.name = name;
// };
//
//
// // get all products from category
// Category.FindById = function (db, id, callback) {
//     var collection = db.collection('Categories');
//     if(id.length == 24){
//         collection.aggregate([
//             { $match: { _id: new ObjectId(id) }},
//
//             { $unwind: '$ProductIds' },
//
//             { $lookup: {
//                 from: 'Products',
//                 localField: 'ProductIds',
//                 foreignField: '_id',
//                 as: 'productObjects'
//             }},
//
//             { $unwind: '$productObjects' },
//
//             { $group: {
//                 _id: '$_id',
//                 Name: { $push: '$Name'},
//                 ProductObjects: { $push: '$productObjects' }
//             }},
//             { $unwind: '$Name' }
//         ], function(err, results){
//             callback(results[0]);
//         });
//     }else{
//         callback(false);
//     }
// };
//
// Category.FindBySlug = function(db, slug, callback){
//     var collection = db.collection('Categories');
//
//     collection.find({'Slug':slug}).toArray(function(err, collection){
//         callback(collection)
//     });
// }
//
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
//
//
//
//
// module.exports = Category;