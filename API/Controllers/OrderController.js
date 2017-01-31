const RestfulController = require('./../Helpers/RestfulController'),
    Model = require('./../Models/Order');

module.exports = class OrderController extends RestfulController {
    constructor(req, res, next) {
        super(Model, req, res, next)
    }

    index() {
        this.model.getAllOrders()
        .then(result => {
            console.log(result)
            this.res.send(result)
        })
        .catch(this.next)
    }  
    


};
