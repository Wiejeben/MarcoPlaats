const Authenticatable = require('./Authenticatable');

module.exports = class User extends Authenticatable {
    constructor() {
        super('Users', schemas.User)
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
                    path: '$WishlistProductIds',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'Products',
                    localField: 'WishlistProductIds',
                    foreignField: '_id',
                    as: 'WishlistProducts'
                }
            },

            {
                $unwind: {
                    path: '$FavoriteProductIds',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'Products',
                    localField: 'FavoriteProductIds',
                    foreignField: '_id',
                    as: 'FavoriteProducts'
                }
            },

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
                    FirstName: { $first: '$FirstName' },
                    LastName: { $first: '$LastName' },
                    OAuthId: { $first: '$OAuthId' },
                    Email: { $first: '$Email' },
                    Role: { $first: '$Role' },
                    PhuneNumber: { $first: '$PhoneNumber' },
                    PublicWishList: { $first: '$PublicWishList' },
                    WishlistProducts: { $push: '$WishlistProducts' },
                    FavoriteProducts: { $push: '$FavoriteProducts' },
                    Products: { $push: '$Products' },
                }
            }
        ]).toArray()
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
};

//// require context
//var Context = require('./../Helpers/Context.js'),
//    schemas = require('./Schemas.js'),
//    ObjectId = require('mongodb').ObjectID,
//    crypto = require('crypto');
//
//
//var User = function (data) {
//    this.data = data;
//};
//
//User.Delete = function (db, id, callback) {
//    Context.Delete(db, 'Users', id, callback);
//}
//
//User.Update = function (db, id, body, callback) {
//    Context.Update(db, 'Users', id, body, schemas.UserPersonal, callback);
//}
//
//// Orders
//User.GetAllOrders = function(db, params, callback) {
//    var collection = db.collection('Users');
//
//    collection.find({ _id: new ObjectId(params.uid) },
//                    {Orders:1})
//                    .toArray(function(err, collection){
//       callback(collection);
//    });
//}
//
//User.InsertOrder = function(db, params, body, callback) {
//    var collection = db.collection('Users');
//
//    body = Context.sanitize(body, schemas.Order);
//    body._id = new ObjectId();
//
//    collection.update(
//        {_id: new ObjectId(params.uid)},
//        {$push: {Orders:body}}, function(err, r){
//            callback();
//        });
//}
//
//User.FindOrderById = function(db, params, callback) {
//    var collection = db.collection('Users');
//
//    collection.find({ _id: new ObjectId(params.uid)},
//                    {Orders: {$elemMatch: {_id: new ObjectId(params.id)}}},
//                    {Orders:1})
//                    .toArray(function(err, collection){
//        callback(collection);
//    });
//}
//
//User.DeleteOrder = function(db, params, callback) {
//    var collection = db.collection('Users');
//
//    collection.update({_id: new ObjectId(params.uid),
//                     Orders: {$elemMatch: {_id: new ObjectId(params.id)}}},
//                      {$pull: {Orders:{_id: new ObjectId(params.id)}}},
//                       function(err, r){
//        callback();
//    });
//
//}
//
//// Wishlist
//User.GetWishlist = (db, params, callback) => {
//    var collection = db.collection('Users');
//
//    // collection.find({_id:new ObjectId(params.uid)},
//    //                     {WishlistProductIds:1})
//    //                     .toArray(function(err, results) {
//    //                         callback(results);
//    //                 });
//
//
//    collection.aggregate([
//        { $match: {_id: new ObjectId(params.uid)}},
//        // Unwind the source
//        { $unwind: '$WishlistProductIds'},
//        // Do the lookup matching
//        { $lookup: {
//                from: 'Products',
//                localField: 'WishlistProductIds',
//                foreignField: '_id',
//                as: 'productObjects'
//        }},
//        // Unwind the result arrays ( likely one or none )
//        { $unwind: '$productObjects' },
//        // Group back to arrays
//        {  $group: {
//                _id: '$_id',
//                productObjects: { $push: '$productObjects' }
//        }},
//    ], function(err, results){
//        callback(results[0]);
//    });
//}
//
//// Insert into wishlist
//User.InsertWishlist = (db, params, body, callback) => {
//    var collection = db.collection('Users');
//
//    var _objectId = new ObjectId(body.ProductId);
//
//    collection.update({_id:new ObjectId(params.uid)},
//                        {$addToSet: {WishlistProductIds: _objectId}}, function(err, r){
//                            callback()
//                        });
//}
//// Delete from wishlist
//User.DeleteWishlist = (db, params, callback) => {
//    var collection = db.collection('Users');
//
//    collection.update({_id: new ObjectId(params.uid)},
//                        {$pull: {WishlistProductIds: { $in: [new ObjectId(params.id)]}}},
//                        function(err, r){
//                            callback(0);
//                        })
//}
//
//// Favourites
//User.GetFavourites = (db, params, callback) => {
//    var collection = db.collection('Users');
//
//    //  collection.find({_id: new ObjectId(params.uid)},
//    //                  {FavoriteProductIds:1})
//    //                  .toArray(function(err, collection) {
//    //                     callback(collection);
//    //     });
//
//
//    collection.aggregate([
//        { $match: { _id: new ObjectId(params.uid)} },
//        { $unwind: '$FavoriteProductIds' },
//        { $lookup: {
//            from:'Products',
//            localField:'FavoriteProductIds',
//            foreignField:'_id',
//            as: 'productObjects'
//        }},
//        { $unwind: '$productObjects' },
//        { $group: {
//            _id: '$_id',
//            productObjects: { $push: '$productObjects' }
//        }}
//    ],
//    function(err, collection) {
//        callback(collection)
//    })
//
//}
//// Insert into favourites
//User.InsertFavourite = (db, params, body,  callback) => {
//    var collection = db.collection('Users');
//
//    collection.update({_id: new ObjectId(params.uid)},
//                       {$addToSet: {FavoriteProductIds:new ObjectId(body.ProductId)}}, function(err, r){
//                           callback();
//                       });
//}
//// Delete from favourites
//User.DeleteFavourite = (db, params, callback) => {
//    var collection = db.collection('Users');
//
//    collection.update({_id:new ObjectId(params.uid)},
//                      {$pull: {FavoriteProductIds: { $in: [new ObjectId(params.id)]}}},
//                      function(err, r){
//                          callback();
//                      });
//}
//
//
///*
//    Products
//*/
//
//User.InsertProduct = (db, OauthId, productId, callback) => {
//    var collection = db.collection('Users');
//
//    User.GetByToken(db, OauthId, function(_user){
//        collection.update({_id: _user._id},
//                      {$addToSet: {ProductIds:productId}}, function(err, r) {
//                          callback(productId);
//                      });
//    });
//}
//
//User.GetProducts = (db, params, callback) => {
//    var collection = db.collection('Users');
//
//    collection.aggregate([
//        { $match: { _id: new ObjectId(params.uid)}},
//        { $unwind: '$ProductIds' },
//        { $lookup: {
//            from:'Products',
//            localField:'ProductIds',
//            foreignField:'_id',
//            as: 'productObjects'
//        }},
//        { $unwind: '$productObjects' },
//        { $group: {
//            _id: '$_id',
//            productObjects: { $push: '$productObjects' }
//        }}
//    ],
//    function(err, collection){
//        callback(collection[0]);
//    });
//}
//
//User.DeleteProduct = (db, params, callback) => {
//    var collection = db.collection('Users');
//
//    collection.update({_id:new ObjectId(params.uid)},
//                      {$pull: {ProductIds: { $in: [new ObjectId(params.id)]}}},
//                      function(err, r){
//
//                          if(r.result.nModified){
//                              callback(params.id);
//                          }else{
//                              callback(false);
//                          }
//                      });
//}
//
//
//module.exports = User;