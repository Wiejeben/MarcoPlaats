var Context = require('./../Helpers/Context.js');

var Product = function (data) {
    this.data = data;
};

Product.prototype.data = {};

Product.prototype.changeName = function (name) {  
    this.data.name = name;
};

Product.GetAll = function(callback) {
    Context.GetAll('Products', callback)
}

Product.Insert = function(body, callback) {
    Context.Insert('Products', body, callback);
}

Product.FindById = function (id, callback) {  
    Context.FindById('Products', id, callback)
};


module.exports = Product;