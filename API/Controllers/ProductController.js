var Product = require('./../Models/Product');
var Image = require('./../Models/Image');

exports.Index = function(req, res, next){
    Product.GetAll(function(products){
        res.send(products);
    })
    // res.send("Return all");
}

exports.Create = function(req, res, next){
    Product.Insert(req.body, function(){
        res.send("Product is added");
    })
}

exports.Show = function(req, res, next) {
    Product.FindById(req.params.id, function(product){
        res.send(product);
    })
}

exports.Update = function(req, res, next) {
    res.send("Update" + req.params.id);
}

exports.Delete = function(req, res, next) {
    res.send("Delete " + req.params.id);
}