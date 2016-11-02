var Context = require('./../Helpers/Context.js');
var schemas = require('./Schemas.js');

var Product = function (data) {
    this.data = data;
};

Product.prototype.data = {};

Product.prototype.changeName = function (name) {
    this.data.name = name;
};

Product.GetAll = function(db, callback) {
    Context.GetAll(db, 'Products', callback)
}

Product.Insert = function(db, body, callback) {
    Context.Insert(db, 'Products', body, callback, schemas.Product);
}

Product.FindById = function (db, id, callback) {
    Context.FindById(db, 'Products', id, callback)
};


module.exports = Product;
