var Product = require('./../Models/Product');
var Image = require('./../Models/Image');

exports.Index = function(req, res, next){
    res.send("Return all");
}

exports.Create = function(req, res, next){
    res.send("create");
}

exports.Show = function(req, res, next) {


    var product = new Product({
        _id: 1,
        Name: "Fiets",
        Description:"Dit is een hele mooie fiets",
        Price:700.10,
        Amount:50,
        Properties: ["Mooi", "snel"],
        Images: [
            new Image({_id:1, Filename:"foto1.jgp"}),
            new Image({_id:2, Filename:"foto2.jgp"})
        ],
        PublishDate: new Date().getDate(),
        Deleted:false
    });

    res.send(product);
}

exports.Update = function(req, res, next) {
    res.send("Update" + req.params.id);
}

exports.Delete = function(req, res, next) {
    res.send("Delete " + req.params.id);
}