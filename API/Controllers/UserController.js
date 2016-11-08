var User = require('./../Models/User');
var Product = require('./../Models/Product');
var Image = require('./../Models/Image');

exports.Index = function (req, res, next) {
    User.GetAll(this.locals.db, function(collection){
        res.send({data:collection})
    });
};

exports.Create = function (req, res, next) {
    User.Insert(this.locals.db, req.body, function(){
        res.send('Created a user');
    })
};

exports.Show = function (req, res, next) {
    User.FindById(this.locals.db, req.params.id, function(user) {
        res.send(user);
    });
};

exports.Update = function (req, res, next) {
    User.Update(this.locals.db, req.params.id, req.body, function(test) {
        res.send(test);
    })
};

exports.Delete = function (req, res, next) {
    User.Delete(this.locals.db, req.params.id, function(deletedCount) {
        res.send('Deleted accounts: ' + deletedCount);
    });
};