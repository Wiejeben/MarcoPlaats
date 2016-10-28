var User = require('./../Models/User');
var Product = require('./../Models/Product');
var Image = require('./../Models/Image');

exports.Index = function(req, res, next){
    res.send("Return all");
}

exports.Create = function(req, res, next){
    console.log(req.body);
    res.send(User.Insert(req.body));
}

exports.Show = function(req, res, next) {
    res.send(User.findById(req.params.id));
}

exports.Update = function(req, res, next) {
    res.send("Update" + req.params.id);
}

exports.Delete = function(req, res, next) {
    res.send("Delete " + req.params.id);
}