const RestfulController = require('./../Helpers/RestfulController'),
    Product = require('./../Models/Product'),
    User = require('./../Models/User');

module.exports = class ProductController extends RestfulController {
    constructor(req, res, next) {
        super(Product, req, res, next)
    }

    create() {
        this.model.params = this.req.params;
        this.model.document = this.req.body;

        this.model.insert()
            .then(() => {

            }).then(() => {

                this.res.statusCode = 201;
                this.res.send(this.model.document);
            })
            .catch(this.next)
    }
};
