var Category = require('./../Models/Category');
var Image = require('./../Models/Image');

exports.Index = function(req, res, next){
    Category.GetAll(this.locals.db, function(categories){
        res.send(categories);
    });
};

exports.Create = function(req, res, next){
    Category.Insert(this.locals.db, req.body, function(){
        res.send("Category is added");
    });
};

exports.Show = function(req, res, next) {
    // Find by ID
    Category.FindById(this.locals.db, req.params.id, function(category){
        res.send(category);
    });
};

exports.Update = function(req, res, next) {
    res.send("Update" + req.params.id);
};

exports.Delete = function(req, res, next) {
    Category.Delete(this.locals.db, req.params.id, function(deletedCount) {
        res.send('Deleted accounts: ' + deletedCount);
    });
};