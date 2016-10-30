var User = require('./../Models/User');
var Product = require('./../Models/Product');
var Image = require('./../Models/Image');

exports.Index = function (req, res, next) {
    User.GetAll(this.locals.db, function(collection){
        res.send(collection)
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
    res.send("Update" + req.params.id);
};

exports.Delete = function (req, res, next) {
    res.send("Delete " + req.params.id);
};