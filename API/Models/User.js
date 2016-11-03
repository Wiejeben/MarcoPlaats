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

User.InsertFromGoogle = function(db, profile, callback) {
    User.Exists(db, profile, function(result){
        if(result.length == 0){
            var _user = {
                FirstName: profile.name.givenName, 
                LastName: profile.name.familyName,
                OAuthId: profile.id, 
                Email: profile.emails[0].value,
                Role: 'user'
            }
            
            User.Insert(db, _user, function(){
                callback(profile.id);
            });
        }else{
            callback(result);
        }
    })
}

User.Exists = function(db, profile, callback) {
    var collection = db.collection('Users');

    collection.find({OAuthId: profile.id}).toArray(function(err, collection) {
            callback(collection);
        });
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

User.Update = function (db, id, body, callback) {
    Context.Update(db, 'Users', id, body, schemas.UserPersonal, callback);
}

// Orders
User.GetAllOrders = function(db, params, callback) {
    var collection = db.collection('Users');

    collection.find({ _id: new ObjectId(params.uid) },
                    {Orders:1})
                    .toArray(function(err, collection){
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

    collection.find({ _id: new ObjectId(params.uid)},
                    {Orders: {$elemMatch: {_id: new ObjectId(params.id)}}},
                    {Orders:1})
                    .toArray(function(err, collection){
        callback(collection);
    });
}

User.DeleteOrder = function(db, params, callback) {
    var collection = db.collection('Users');

    collection.update({_id: new ObjectId(params.uid),
                     Orders: {$elemMatch: {_id: new ObjectId(params.id)}}},
                      {$pull: {Orders:{_id: new ObjectId(params.id)}}},
                       function(err, r){
        callback();
    });

}

// Wishlist
User.GetWishlist = (db, params, callback) => {
    var collection = db.collection('Users');
    
    collection.find({_id:new ObjectId(params.uid)}, 
                        {WishlistProductIds:1})
                        .toArray(function(err, results) {
                            callback(results);
    });
}

User.InsertWishlist = (db, params, body, callback) => {
    var collection = db.collection('Users');

    collection.update({_id:new ObjectId(params.uid)}, 
                        {$addToSet: {WishlistProductIds:body.ProductId}}, function(err, r){
                            callback()
                        });
}



module.exports = User;
