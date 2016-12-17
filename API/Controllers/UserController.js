const RestfulController = require('./../Helpers/RestfulController'),
    User = require('./../Models/User'),
    Product = require('./../Models/Product');

module.exports = class UserController extends RestfulController {
    constructor(req, res, next) {
        super(User, req, res, next);
    }

    static showByToken(req, res, next) {
        let user = new User();

        user.findByToken(req.headers.authorization)
            .then(() => {
                if (user.document == null) {
                    return Promise.reject(new restify.UnprocessableEntityError('Unable to find user with specified authorization header'))
                }
                res.send(user.document)
            })
            .catch(err => {
                res.statusCode = 422;
                res.send({ message: err.message })
            })
    }

    getWishList() {
        this.model.getForeignProducts(this.req.params.id, 'WishlistProductIds')
            .then(result => {
                this.res.send(result)
            })
            .catch(this.next)
    }

    getFavorites() {
        this.model.getForeignProducts(this.req.params.id, 'FavoriteProductIds')
            .then(result => {
                this.res.send(result)
            })
            .catch(this.next)
    }

    getProducts() {
        this.model.getForeignProducts(this.req.params.id, 'ProductIds')
            .then(result => {
                this.res.send(result)
            })
            .catch(this.next)
    }
};
