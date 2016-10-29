// require context
var Context = require('./../helpers/context');


var User = function (data) {
    this.data = data;
};

User.prototype.data = {};

User.Insert = function(body, callback) {
    Context.Insert('Users', body, callback);
}

User.GetAll = function(callback) {
    Context.GetAll('Users', callback);
}

User.FindById = function (id, callback) {
    Context.FindById('Users', id, callback);
};


module.exports = User;