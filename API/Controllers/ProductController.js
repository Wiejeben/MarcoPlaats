var Product = require('./../Models/Product');
var Image = require('./../Models/Image');

exports.Index = function(req, res, next){
    Product.GetAll(this.locals.db, function(products){
        res.send({data:products});
    });
};

exports.Create = function(req, res, next){
    Product.Insert(this.locals.db, req.body, function(){
        res.send("Product is added");
    })
};

exports.Show = function(req, res, next) {
    Product.FindById(this.locals.db, req.params.id, function(product){
        res.send({data:product});
    })
};

exports.Update = function(req, res, next) {
    res.send("Update" + req.params.id);
};

exports.Delete = function(req, res, next) {
    res.send("Delete " + req.params.id);
};