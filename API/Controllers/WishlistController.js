var User = require('./../Models/User');

exports.Index = function (req, res, next) {
    User.GetWishlist(this.locals.db, req.params, function(collection){
        res.send({data:collection})
    });
};

exports.Create = function (req, res, next) {
    User.InsertWishlist(this.locals.db, req.params, req.body, function(){
        res.send('Created a user');
    })
};

// ??
exports.Show = function (req, res, next) {
    User.FindById(this.locals.db, req.params.id, function(user) {
        res.send({data:user});
    });
};

exports.Update = function (req, res, next) {
    User.UpdateWishlist(this.locals.db, req.params, req.body, function(test) {
        res.send(test);
    })
};

exports.Delete = function (req, res, next) {
    User.DeleteWishlist(this.locals.db, req.params, function(deletedCount) {
        res.send('Delete Wishlist: ' + deletedCount);
    });
};