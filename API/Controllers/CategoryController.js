var Category = require('./../Models/Category');
var Image = require('./../Models/Image');

exports.Index = function(req, res, next){
    Category.GetAll(this.locals.db, function(categories){
        res.send({data:categories});
    });
};

exports.Create = function(req, res, next){
    // Get post
    var body = req.body;

    // Create new Category
    _category = new Category({
        name: body.Name,
        ProductIds: []
    });

    Category.Insert(this.locals.db, _category, function(){
        res.send("Category is added");
    });
};

exports.Show = function(req, res, next) {
    // Find by ID
    Category.FindById(this.locals.db, req.params.id, function(category){
        res.send({data:category});
    });

    // Find by Slug
    // Category.FindBySlug(this.locals.db, req.params.id, function(category){
    //     res.send({data:category});
    // });
};

exports.Update = function(req, res, next) {
    res.send("Update" + req.params.id);
};

exports.Delete = function(req, res, next) {
    res.send("Delete " + req.params.id);
};