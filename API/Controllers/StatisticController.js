const Product = require('./../Models/Product'), 
      Category = require('./../Models/Category'),
      User = require('./../Models/User'),
      Order = require('./../Models/Order'),
      Controller = require('./../Helpers/Controller');

module.exports = class StatisticController extends Controller {
    constructor(req, res, next) {
        super(req, res, next)
        this.Product = new Product()
        this.User = new User()
        this.Category = new Category()
    }

    index() {
        if(Object.keys(this.req.params).length > 0){
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
        } else {
            return super.index()
        }
    }

    getProducts() {
        if(Object.keys(this.req.params).length > 0){
            let start = parseInt(this.req.params.start)
            let end = parseInt(this.req.params.end)
            this.Product.collection.aggregate([
                {
                    $match: {
                        CreatedAt: { 
                            $gte: start, 
                            $lte: end 
                        }
                    }
                },
               { $group: { _id: null, count: { $sum: 1 } } }
                ]).toArray()
                .then(results => {
                    this.res.send(results[0])
                })
                .catch(this.next())
        } else {
            this.Product.collection.aggregate([
                { $group: { _id: null, count: {$sum:1 } } }
            ]).toArray()
            .then(results => {
                this.res.send(results[0])
            })
            .catch(this.next())
        }
    }

    getCategories() {
        let dateQuery = {}
        let start = parseInt(this.req.params.start)
        let end = parseInt(this.req.params.end)
        dateQuery = { 'Products.CreatedAt': { $gte : start, $lte: end } }
        
        
        this.Category.collection.aggregate([
            { $match: {} },

            {
                $unwind: {
                    path: '$ProductIds',
                    // preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'Products',
                    localField: 'ProductIds',
                    foreignField: '_id',
                    as: 'Products'
                }
            },

            { $unwind: '$Products' },

            { $match: dateQuery },
            
            { $group: {
                _id: "$Name",
                // id: "$_id",
                count: { $sum: 1 } 
            }},
        ]).toArray()
        .then(results => {
            this.res.send(results)
        })
        .catch(this.next())
        
    }
};
