// require context
var Context = require('./../Helpers/Context.js');
var schemas = require('./Schemas.js');
var ObjectId = require('mongodb').ObjectID;
var crypto = require('crypto');


var User = function (data) {
    this.data = data;
};

User.prototype.data = {};

//Encrypt OauthId
User.encryptToken = function(text){
    var cipher = crypto.createCipher(global.config.Encryption.algorithm, global.config.Encryption.password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

//Decrypt OauthId
User.decryptToken = function(text){
    var decipher = crypto.createDecipher(global.config.Encryption.algorithm, global.config.Encryption.password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    
    return dec;
}

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
                var encryptedToken = User.encryptToken(profile.id);
                callback(encryptedToken);
            });
        }else{
            var encryptedToken = User.encryptToken(result[0].OAuthId);
            callback(encryptedToken);
        }
    })
}

User.GetByToken = function (db, OauthId, callback) {
    var collection = db.collection('Users');
    var decryptedToken = User.decryptToken(OauthId);

    // console.log('hello');

    collection.findOne({OAuthId:decryptedToken}, function(err, collection){
        callback(collection);
    });
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
    
    // collection.find({_id:new ObjectId(params.uid)}, 
    //                     {WishlistProductIds:1})
    //                     .toArray(function(err, results) {
    //                         callback(results);
    //                 });


    collection.aggregate([
        { $match: {_id: new ObjectId(params.uid)}},
        // Unwind the source
        { $unwind: '$WishlistProductIds'},
        // Do the lookup matching
        { $lookup: {
                from: 'Products',
                localField: 'WishlistProductIds',
                foreignField: '_id',
                as: 'productObjects'
        }},
        // Unwind the result arrays ( likely one or none )
        { $unwind: '$productObjects' },
        // Group back to arrays
        {  $group: {
                _id: '$_id',
                productObjects: { $push: '$productObjects' }
        }}
    ], function(err, results){
        callback(results);
    });
}

// Insert into wishlist
User.InsertWishlist = (db, params, body, callback) => {
    var collection = db.collection('Users');

    var _objectId = new ObjectId(body.ProductId);

    collection.update({_id:new ObjectId(params.uid)}, 
                        {$addToSet: {WishlistProductIds: _objectId}}, function(err, r){
                            callback()
                        });
}
// Delete from wishlist
User.DeleteWishlist = (db, params, callback) => {
    var collection = db.collection('Users');

    collection.update({_id: new ObjectId(params.uid)},
                        {$pull: {WishlistProductIds: { $in: [new ObjectId(params.id)]}}},
                        function(err, r){
                            callback(0);
                        })
}

// Favourites
User.GetFavourites = (db, params, callback) => {
    var collection = db.collection('Users');

    //  collection.find({_id: new ObjectId(params.uid)},
    //                  {FavoriteProductIds:1})
    //                  .toArray(function(err, collection) {
    //                     callback(collection);
    //     });


    collection.aggregate([
        { $match: { _id: new ObjectId(params.uid)} },
        { $unwind: '$FavoriteProductIds' },
        { $lookup: { 
            from:'Products',
            localField:'FavoriteProductIds',
            foreignField:'_id',
            as: 'productObjects'
        }},
        { $unwind: '$productObjects' },
        { $group: {
            _id: '$_id',
            productObjects: { $push: '$productObjects' }
        }}
    ],
    function(err, collection) {
        callback(collection)
    })

}
// Insert into favourites
User.InsertFavourite = (db, params, body,  callback) => {
    var collection = db.collection('Users');

    collection.update({_id: new ObjectId(params.uid)},
                       {$addToSet: {FavoriteProductIds:new ObjectId(body.ProductId)}}, function(err, r){
                           callback();
                       });
}
// Delete from favourites
User.DeleteFavourite = (db, params, callback) => {
    var collection = db.collection('Users');

    collection.update({_id:new ObjectId(params.uid)},
                      {$pull: {FavoriteProductIds: { $in: [new ObjectId(params.id)]}}}, 
                      function(err, r){
                          callback();
                      });
}


module.exports = User;