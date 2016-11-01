var User = require('./../Models/User');
var Product = require('./../Models/Product');
var Image = require('./../Models/Image');

exports.Index = function (req, res, next) {
    User.GetAll(this.locals.db, function(collection){
        res.send({data:collection})
    });
};

exports.Create = function (req, res, next) {
    console.log(req.body);
    User.Insert(this.locals.db, req.body, function(){
        res.send('Created a user');
    })
};

exports.Show = function (req, res, next) {
    User.FindById(this.locals.db, req.params.id, function(user) {
        res.send({data:user});
    });
};

exports.Update = function (req, res, next) {
    res.send("Update" + req.params.id);
};

exports.Delete = function (req, res, next) {
    User.Delete(this.locals.db, req.params.id, function(deletedCount) {
        res.send('Deleted accounts: ' + deletedCount);
    });
};