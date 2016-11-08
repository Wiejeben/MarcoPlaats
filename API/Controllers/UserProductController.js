var User = require('./../Models/User');
var Product = require('./../Models/Product');
var Category = require('./../Models/Category');

exports.Index = function (req, res, next) {
    User.GetProducts(this.locals.db, req.params, function(collection){
        res.send(collection);
    });
};

exports.Create = function (req, res, next) {
    // User.InsertFavourite(this.locals.db, req.params, req.body, function(){
        // res.send('Created a user');
    // })
};

exports.Delete = function (req, res, next) {
    var _db = this.locals.db;
    var productId = null;
    User.DeleteProduct(_db, req.params, function(response){
        if(response){
            productId = response;
            Product.Delete(_db, response, function(result){
                Category.DeleteProduct(_db, productId, function(result){
                    res.send(true);
                })
            });
        }else{
            res.send(false);
        }
    });
    // User.DeleteFavourite(this.locals.db, req.params, function(deletedCount) {
    //     res.send('Delete Wishlist: ' + deletedCount);
    // });
};


// ??
exports.Show = function (req, res, next) {
    // User.FindById(this.locals.db, req.params.id, function(user) {
    //     res.send({data:user});
    // });
};

exports.Update = function (req, res, next) {
    // User.UpdateWishlist(this.locals.db, req.params, req.body, function(test) {
    //     res.send(test);
    // })
};