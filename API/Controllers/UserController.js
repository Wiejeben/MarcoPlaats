var User = require('./../Models/User');
var Product = require('./../Models/Product');
var Image = require('./../Models/Image');

exports.Index = function(req, res, next){
    res.send("Return all");
}

exports.Create = function(req, res, next){
    res.send("create");
}

exports.Show = function(req, res, next) {
    var user = new User({
        _id: 1,
        FirstName: "Daan",
        LastName: "Grashoff",
        Email: "0913610@hr.nl",
        Password: "123qwe",
    });
    

    res.send(user);
}

exports.Update = function(req, res, next) {
    res.send("Update" + req.params.id);
}

exports.Delete = function(req, res, next) {
    res.send("Delete " + req.params.id);
}