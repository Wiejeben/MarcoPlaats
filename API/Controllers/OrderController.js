var User = require('./../Models/User');

exports.Index = function (req, res, next) {
    User.GetAllOrders(this.locals.db, req.params, function(orders) {
        res.send(orders);
    });
};

exports.Create = function (req, res, next) {
    User.InsertOrder(this.locals.db, req.params, req.body, function(){
        res.send('Inserted a order');
    })
};

exports.Show = function (req, res, next) {
    console.log(req.params);
    User.FindOrderById(this.locals.db, req.params, function(order) {
        res.send({data:order});
    });
};

exports.Update = function (req, res, next) {
    User.Update(this.locals.db, req.params.id, function(test) {
        res.send(test);
    })
};

exports.Delete = function (req, res, next) {
    User.DeleteOrder(this.locals.db, req.params, function(deletedCount) {
        res.send('Deleted accounts: ' + deletedCount);
    });
};