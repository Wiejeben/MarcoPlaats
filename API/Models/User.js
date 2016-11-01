// require context
var Context = require('./../helpers/context');
var Schema = require('Schemas1.js');

var Context = require('./../Helpers/Context.js');

var User = function (data) {
    this.data = data;
};

User.prototype.data = {};

User.Insert = function(db, body, callback) {

    Context.Insert(db, 'Users', body, callback);
}

User.GetAll = function(db, callback) {
    Context.GetAll(db, 'Users', callback);
}

User.FindById = function (db, id, callback) {
    Context.FindById(db, 'Users', id, callback);
};


module.exports = User;
