const RestfulController = require('./../Helpers/RestfulController'),
    User = require('./../Models/User'),
    Product = require('./../Models/Product');

module.exports = class UserController extends RestfulController {
    constructor(req, res, next) {
        super(User, req, res, next)
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
            .catch(next)
    }

    // WishList
    getWishList() {
        this.model.getForeignProducts(this.req.params.userId, 'WishlistProductIds')
            .then(result => {
                this.res.send(result)
            })
            .catch(this.next)
    }

    addWishListItem() {
        this.model.addForeignProduct(this.req.params.userId, 'WishlistProductIds', this.req.body.ProductId)
            .then(result => {
                this.res.send(result)
            })
            .catch(this.next)
    }

    deleteWishListItem() {
        this.model.deleteForeignProduct(this.req.params.userId, 'WishlistProductIds', this.req.params.productId)
            .then(result => {
                this.res.send(result)
            })
            .catch(this.next)
    }

    // Favorites
    getFavorites() {
        this.model.getForeignProducts(this.req.params.userId, 'FavoriteProductIds')
            .then(result => {
                this.res.send(result)
            })
            .catch(this.next)
    }

    addFavorite() {
        this.model.addForeignProduct(this.req.params.userId, 'FavoriteProductIds', this.req.body.ProductId)
            .then(result => {
                this.res.send(result)
            })
            .catch(this.next)
    }

    deleteFavorite() {
        this.model.deleteForeignProduct(this.req.params.userId, 'FavoriteProductIds', this.req.params.productId)
            .then(result => {
                this.res.send(result)
            })
            .catch(this.next)
    }

    // Products
    getProducts() {
        this.model.getForeignProducts(this.req.params.userId, 'ProductIds')
            .then(result => {
                this.res.send(result)
            })
            .catch(this.next)
    }
};
