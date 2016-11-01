// require ObjectId
var ObjectId = require('mongodb').ObjectID;

var Context = function (collection) {
    this.collection = collection;
};

Context.GetAll = function(db, _collection, callback) {
    // Get the collection
    var collection = db.collection(_collection);
    // find all
    collection.find({}).toArray(function(err, col) {
        callback(col);
    });
};

Context.Insert = function(db, _collection, body, callback) {
    var collection = db.collection(_collection);

    collection.insertOne(body, function(err, result){
        callback();
    });
};

Context.FindById = function(db, _collection, id, callback) {
    var collection = db.collection(_collection);
    // ugly
    if(id.length == 24){
        collection.find({'_id': new ObjectId(id)}).toArray(function(err, collection) {
            callback(collection);
        });
    }else{
        callback({});
    }
};


Context.Update = function(db, _collection, id, params, callback) {
    var collection = db.collection(_collection);
    collection.update(
        {_id: new ObjectId(id)},
        {$push: {ProductIds: new ObjectId()}});
    // callback('test');
}

Context.Delete = function(db, _collection, id, callback) {
    var collection = db.collection(_collection);

    collection.deleteOne({'_id': new ObjectId(id)}, function(err, r) {
        callback(r.deletedCount);
    });
}





module.exports = Context;