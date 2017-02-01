const Model = require('./../Helpers/Model'),
    Category = require('./Category'),
    User = require('./User'),
    schemas = require('./../schemas.js')

module.exports = class Product extends Model {
    constructor() {
        super('Products', schemas.Product);
        this.hasCreatedAt = true;
        this.hasDeletedAt = true
    }

    findGreatestPrice(){
        return this.collection.aggregate([
            {
                $group: {
                    '_id':'$_id',
                    'Price': {
                        $max: '$Price'
                    }
                }
            },
            {
                $sort: {
                    'Price': -1
                }
            },
            {
                $limit:1
            }
        ]).toArray().then(results => {
            return Promise.resolve(results[0])
        }).catch(Promise.reject)
    }

    /**
     * Insert and assign to category and user.
     *
     * @return {Promise}
     */
    insert() {
        // Validate category id before inserting product
        const categoryId = this.document.Category
        if (!this.validateId(categoryId)) return Promise.reject(new restify.BadRequestError('Invalid or missing category ObjectId'))

        const promise = super.insert()

        promise.then(() => {
            // Apply to category
            const category = new Category()
            category.insertProduct(categoryId, this.document._id)

            // Apply to logged in user
            if (typeof loggedInUser !== 'undefined') {
                loggedInUser.insertProduct(this.document._id)
            }
        })

        /* if(this.document.Images.length > 0){
            var Images = this.document.Images;
            for (var i = Images.length - 1; i >= 0; i--) {
                var base64Data = Images[i].Image.replace(/^data:image\/png;base64,/, "");

                require("fs").writeFile('upload/products/'+Images[i].Name, base64Data, 'base64', function(err) {
                  console.log(err);
                });
                console.log(base64Data)
            };
        } */

        return promise
    }

    update() {
        const categoryId = this.document.Category,
              productId = this.params.id;

        if (!this.validateId(categoryId)) return Promise.reject(new restify.InvalidContentError('Invalid category ObjectId'))

        const promise = super.update();

        return promise.then(() => {
            // apply to category
            return Promise.resolve()
        }).then(() => {
            return new Category().insertProduct(categoryId, productId)
        }).then(() => {
            return Promise.resolve()
        }).catch((err) => {
            return Promise.reject(err)
        })
    }

    destroy() {
        this.document.Amount = 0;
        return super.destroy();

        // Remove from categories and users
        //return super.destroy().then(result => {
        //    return new Category().deleteProduct(this.document._id)
        //}).then(() => {
        //    const User = require('./User')
        //    return new User().deleteProduct(this.document._id)
        //}).catch((err) => {
        //    return Promise.reject(err)
        //})
    }
};
