// require MongoDB
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// require schema
var schemas = require('./schemas');

// Connection URL
var url = 'mongodb://localhost:27017/MarcoPlaats';

var User = function (data) {
    this.data = data;
};

User.prototype.data = {};

User.prototype.changeName = function (name) { 
    this.data.name = name;
};

User.prototype.get = function (name) {
    return this.data[name];
}

User.prototype.set = function (name, value) {
    return this.data[name] = value;
}

// User.prototype.sanitize = function (data){
//     data = data || {};
//     schema = schemas.user;
//     return 
// }





User.Insert = function(body) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertUser(body, db, function() {
            db.close();
        });
    });
    return "Created";
}


var insertUser = function(user, db, callback) {
    // Get the documents collection
    var collection = db.collection('Users');

    // Insert some documents
    collection.insertOne(user, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });
}


User.findById = function (id, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findUser(id ,db, function() {
            db.close();
        });
    });
};

var findUser = function(id, db, callback) {
  // Get the documents collection
  var collection = db.collection('Users');
  // Find some documents
  collection.find({'FirstName': id}).toArray(function(err, users) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(users);
    callback(users);
  });      
  
  return users;
}

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('Users');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}


module.exports = User;