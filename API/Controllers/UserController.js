const RestfulController = require('./../Helpers/RestfulController'),
    User = require('./../Models/User'),
    Product = require('./../Models/Product');

module.exports = class UserController extends RestfulController {
    constructor() {
        super(User);
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

    getWishList(req, res, next) {
        this.model.getForeignProducts(req.params.uid, 'WishlistProductIds')
            .then(result => {
                res.send(result)
            })
            .catch(next)
    }

    getFavorites(req, res, next) {
        this.model.getForeignProducts(req.params.uid, 'FavoriteProductIds')
            .then(result => {
                res.send(result)
            })
            .catch(next)
    }

    getProducts(req, res, next) {
        this.model.getForeignProducts(req.params.uid, 'ProductIds')
            .then(result => {
                res.send(result)
            })
            .catch(next)
    }
};
