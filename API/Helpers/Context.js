// require mongodb
var ObjectId = require('mongodb').ObjectID;
var schemas = require('./../models/schemas.js');
var _ = require('lodash');

// Connection url
var url = 'mongodb://localhost:27017/MarcoPlaats';

var Context = function (collection) {
    this.collection = collection;
};

Context.sanitize = function(body, schema){
    return _.pick(_.defaults(body, schema), _.keys(schema));
}

Context.GetAll = function(db, _collection, callback) {
    // Get the collection
    var collection = db.collection(_collection);
    // find all
    collection.find({}).toArray(function(err, col) {
        callback(col);
    });
    // db.close();
};

Context.Insert = function(db, _collection, body, callback, schema) {
        var collection = db.collection(_collection);
        body = this.sanitize(body, schema);
        collection.insertOne(body, function(err, result){
            callback();
        });
};

Context.FindById = function(db, _collection, id, callback) {
        var collection = db.collection(_collection);
        if(id.length == 24){
            collection.find({'_id': new ObjectId(id)}).toArray(function(err, collection) {
                callback(collection);
            });
        }else{
            callback({});
        }
};



module.exports = Context;