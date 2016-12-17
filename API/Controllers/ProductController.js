const RestfulController = require('./RestfulController'),
    Product = require('./../Models/Product'),
    Category = require('./../Models/Category');

module.exports = class ProductController extends RestfulController {
    constructor() {
        super(Product)
    }

    create2(req, res, next) {
        this.model.document = req.body;

        let category = new Category(),
            categoryId = req.body.Category.toString();

        category.findById(categoryId)
            .then(() => {
                if (category.document == null) {
                    res.statusCode = 500;
                    res.send(new Error('Could not find category ObjectId(\'' + categoryId + '\')'));
                    return;
                }

                this.model.insert()
                    .then(() => {
                        // Apply to current logged in user
                        if (req.user) {
                            req.user.relateProduct(this.model.document);
                        }


                        res.statusCode = 201;
                        res.send(this.model.document);
                    })
                    .catch(next)
            })
            .catch(next);
    }
};

//var Product = require('./../Models/Product');
//var User = require('./../Models/User');
//var Category = require('./../Models/Category');
//
//exports.Index = function(req, res, next){
//    Product.GetAll(this.locals.db, function(products){
//        res.send(products);
//    });
//};
//
//exports.Create = function(req, res, next){
//    var _db = this.locals.db;
//    var categoryId = req.body.Category;
//
//    Product.Insert(_db, req.body, function(insertedId){
//        User.InsertProduct(_db, req.headers.authorization, insertedId, function(productId){
//            Category.InsertProduct(_db, categoryId, productId, function(){
//                res.send("Product is added");
//            });
//        })
//    });
//
//};
//
//exports.Show = function(req, res, next) {
//    Product.FindById(this.locals.db, req.params.id, function(product){
//        res.send(product);
//    })
//};
//
//exports.Update = function(req, res, next) {
//    res.send("Update" + req.params.id);
//};
//
//exports.Delete = function(req, res, next) {
//    Product.Delete(this.locals.db, req.params.id, function(deletedItems) {
//        res.send("Delete " + req.params.id + '  '+ deletedItems);
//    });
//};