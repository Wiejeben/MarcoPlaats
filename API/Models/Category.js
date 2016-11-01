var Context = require('./../Helpers/Context.js');

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
    Context.Insert(db, 'Categories', body, callback);
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


module.exports = Category;