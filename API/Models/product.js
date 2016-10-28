var Product = function (data) {
    this.data = data;
};

Product.prototype.data = {};

Product.prototype.changeName = function (name) {  
    this.data.name = name;
};

Product.findById = function (id, callback) {  
    db.get('Products', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new Product(data));
    });
};

module.exports = Product;