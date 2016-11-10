var Context = require('./../Helpers/Context.js'),
    ObjectId = require('mongodb').ObjectID;

var Category = function (data) {
    this.data = data;
};

Category.prototype.data = {};

Category.prototype.changeName = function (name) {  
    this.data.name = name;
};

Category.GetAll = function(db, callback) {
    Context.GetAll(db, 'Categories', callback)
}

Category.Insert = function(db, body, callback) {
    Context.Insert(db, 'Categories', body, callback, schemas.Category);
}

Category.Delete = function(db, id, callback) {
    Context.Delete(db, 'Categories', id, callback);
}

// get all products from category
Category.FindById = function (db, id, callback) {
    var collection = db.collection('Categories');
    if(id.length == 24){
        collection.aggregate([
            { $match: { _id: new ObjectId(id) }},

            { $unwind: '$ProductIds' },

            { $lookup: {
                from: 'Products',
                localField: 'ProductIds',
                foreignField: '_id',
                as: 'productObjects'
            }},

            { $unwind: '$productObjects' },
            
            { $group: {
                _id: '$_id',
                Name: { $push: '$Name'},
                ProductObjects: { $push: '$productObjects' }
            }},
            { $unwind: '$Name' }
        ], function(err, results){
            callback(results[0]);
        });
    }else{
        callback(false);
    }
};

Category.FindBySlug = function(db, slug, callback){
    var collection = db.collection('Categories');
    
    collection.find({'Slug':slug}).toArray(function(err, collection){
        callback(collection)
    });
}

Category.InsertProduct = function(db, categoryId, productId, callback) {
    var collection = db.collection('Categories');

    collection.update({_id: new ObjectId(categoryId)},
                        {$addToSet: {ProductIds: new ObjectId(productId)}},
                        function(err, r){
                            callback();
                        });
}

Category.DeleteProduct = function(db, productId, callback) {
    var collection = db.collection('Categories');

    collection.findAndModify({ProductIds: {$in: [new ObjectId(productId)]}},
                            [],
                            { $pull: { ProductIds: { $in: [new ObjectId(productId)]}}}, function(err, r){
                                callback(r);
                            });
}





module.exports = Category;