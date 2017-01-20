const RestfulController = require('./../Helpers/RestfulController'),
    Product = require('./../Models/Product'),
    User = require('./../Models/User');

module.exports = class ProductController extends RestfulController {
    constructor(req, res, next) {
        super(Product, req, res, next)
    }

    index() {
        if(this.req.params){
            let minPrice = parseInt(this.req.params.minPrice)
            let maxPrice = parseInt(this.req.params.maxPrice)
            
            this.model.find(
                { 
                    Price: { 
                        $gte: minPrice, 
                        $lte: maxPrice 
                    }
                })
                .then(results => {
                    this.res.send(results)
                })
                .catch(this.next())
        }else{
            supert.index()
        }
    }

    getHighestPrice() {
        this.model.findGreatestPrice()
        .then(result => {
            this.res.send(result)
        })
        .catch(this.next)
    }

    create() {
        this.model.params = this.req.params;
        this.model.document = this.req.body;

        this.model.insert()
        .then(() => {
            this.res.statusCode = 201;
            this.res.send(this.model.document)
        })
        .catch(this.next)

    }
};
