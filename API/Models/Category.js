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

Category.FindById = function (db, id, callback) {  
    Context.FindById(db, 'Categories', id, callback)
};

Category.FindBySlug = function(db, slug, callback){
    var collection = db.collection('Categories');
    
    collection.find({'Slug':slug}).toArray(function(err, collection){
        callback(collection)
    });
}

Category.InsertProduct = function(db, categoryId, productId, callback) {
    var collection = db.collection('Categories');
    console.log('catid ' + categoryId);
    console.log('prodId' + productId);

    collection.update({_id: new ObjectId(categoryId)},
                        {$addToSet: {ProductIds: new ObjectId(productId)}},
                        function(err, r){
                            callback();
                        });
}


module.exports = Category;