// require context
var Context = require('./../Helpers/Context.js');
var schemas = require('./Schemas.js');
var ObjectId = require('mongodb').ObjectID;

var User = function (data) {
    this.data = data;
};

User.prototype.data = {};

// Users
User.Insert = function(db, body, callback) {
    Context.Insert(db, 'Users', body, callback, schemas.User);
}

User.GetAll = function(db, callback) {
    Context.GetAll(db, 'Users', callback);
}

User.FindById = function (db, id, callback) {
    Context.FindById(db, 'Users', id, callback);
};

User.Delete = function (db, id, callback) {
    Context.Delete(db, 'Users', id, callback);
}

User.Update = function (db, id, callback) {
    Context.Update(db, 'Users', id, callback);
}

// Orders
User.GetAllOrders = function(db, params, callback) {
    var collection = db.collection('Users');

    collection.find({ _id: new ObjectId(params.uid) }, {Orders:1}).toArray(function(err, collection){
        console.log(err);
        console.log(collection);
       callback(collection); 
    });
}

User.InsertOrder = function(db, params, body, callback) {
    var collection = db.collection('Users');

    body = Context.sanitize(body, schemas.Order);
    body._id = new ObjectId();

    collection.update(
        {_id: new ObjectId(params.uid)},
        {$push: {Orders:body}}, function(err, r){
            callback();
        });
}

User.FindOrderById = function(db, params, callback) {
    var collection = db.collection('Users');

    collection.find({ _id: new ObjectId(params.uid)},{Orders: {$elemMatch: {'_id': new ObjectId(params.id)}}}, {Orders:1}).toArray(function(err, collection){
        callback(collection);
    });
}

User.DeleteOrder = function(db, params, callback) {
    var collection = db.collection('Users');


}
 

module.exports = User;
