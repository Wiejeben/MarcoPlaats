// require mongodb
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert')
    ObjectId = require('mongodb').ObjectID;

// Connection url
var url = 'mongodb://localhost:27017/MarcoPlaats';

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
    // db.close();
};

Context.Insert = function(db, _collection, body, callback) {
    // MongoClient.connect(url, function(err, db) {
        var collection = db.collection(_collection);

        collection.insertOne(body, function(err, result){
            callback();
        });
    // });
};

Context.FindById = function(db, _collection, id, callback) {
    // MongoClient.connect(url, function(err, db) {
        var collection = db.collection(_collection);
        // ugly
        if(id.length == 24){
            collection.find({'_id': new ObjectId(id)}).toArray(function(err, collection) {
                callback(collection);
            });
        }else{
            callback({});
        }
    // });
};



module.exports = Context;