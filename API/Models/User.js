var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/MarcoPlaats';



var User = function (data) {
    this.data = data;
};

User.prototype.data = {};

User.prototype.changeName = function (name) {  
    this.data.name = name;
};

User.Insert = function(body) {
    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocuments(db, function() {
            db.close();
        });
    });
    return "Created";
}

var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('Users');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

User.findById = function (id, callback) {
    return new User({
        _id: id,
        FirstName: "Daan",
        LastName: "Grashoff",
        Email: "0913610@hr.nl",
        Password: "123qwe",
    });  
    // db.get('Users', {id: id}).run(function (err, data) {
    //     if (err) return callback(err);
    //     callback(null, new User(data));
    // });
};

module.exports = User;