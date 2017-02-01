const hippie = require('hippie'),
    mongodb = require('mongodb'),
    restfultest = require('./helpers/restfultest');

require('dotenv').config();
global.integration = true;
global.ObjectId = mongodb.ObjectId;

let str = process.env.DB_STRING;
let result = str.substring(0, str.lastIndexOf("/"));

require('./../server');
describe('Integration tests', () => {

    before(done => {
        mongodb.MongoClient.connect(result + "/MarcoPlaatsIntegrationDB", (err, db_) => {
            if (err) {
                console.error('Unable to connect to MongDB:');
                throw new Error(err)
            }

            global.db = db_;

            // Initialize routes
            require('./../routes/bootstrap');

            // Initial data
            const users = db.collection('Users'),
                category = db.collection('Categories'),
                products = db.collection('Products'),
                orders = db.collection('Orders');

            users.remove()
                .then(() => {
                    return users.insertOne({
                        "_id": ObjectId("5889f94a70e0b10f738762de"),
                        "FirstName": "Jan",
                        "LastName": "Jansen",
                        "OAuthId": null,
                        "Email": "jan@jansen.com",
                        "Role": null,
                        "PhoneNumber": null,
                        "PublicWishlist": false,
                        "MainAddress": {
                            "Address": null,
                            "City": null,
                            "Zipcode": null
                        },
                        "DeliveryAddress": {
                            "Address": null,
                            "City": null,
                            "Zipcode": null
                        },
                        "Orders": [],
                        "ProductIds": [],
                        "WishlistProductIds": [],
                        "FavoriteProductIds": []
                    })
                }).then(() => {
                    return category.remove()
                }).then(() => {
                    return category.insertOne({
                        "_id": ObjectId("5887510ef902b42a38c2de84"),
                        "Name": "Vervoer",
                        "ProductIds": []
                    })
                }).then(() => {
                    return products.remove()
                }).then(() => {
                    return products.insertOne({
                        "_id": ObjectId("588b1ad78ef1aa111cef1c09"),
                        "Name": 'Auto',
                        "Description": 'BMW',
                        "Price": 25000,
                        "Amount": 1,
                        "Images": [],
                        "SellerID": '5889f94a70e0b10f738762de',
                        "Category": '5887510ef902b42a38c2de84',
                        "CreatedAt": null,
                        "DeleteAt": null,
                        "DeliveryMethod": null
                    })
                }).then(() => {
                    return orders.remove();
                }).then(() => {
                    return orders.insertOne({
                        "_id": ObjectId("588751a9f902b42a38c2de87"),
                        "OrderLines": [{
                            "ProductId": ObjectId("588b1ad78ef1aa111cef1c09"),
                            "Amount": 1
                        }],
                        "OrderDate": null,
                        "userId": ObjectId("5889f94a70e0b10f738762de"),
                        "Address": {
                            "Address": 'Marcoplein 1',
                            "City": 'Rotterdam',
                            "Zipcode": '3000AA'
                        }
                    })
                })
                .then(() => {
                    done()
                })
                .catch(err => {
                    console.error('Unable to prepare database:');
                    throw new Error(err)
                })
        })
    });

    restfultest('orders', {
        _id: '588751a9f902b42a38c2de87',
        key: 'Address.Address',
        value: 'Marcoplein 1'
    }, {
        "OrderLines": [{
            "ProductId": ObjectId("588b1ad78ef1aa111cef1c09"),
            "Amount": 1
        }],
        "OrderDate": null,
        "userId": ObjectId("5889f94a70e0b10f738762de"),
        "Address": {
            "Address": 'Wijnhaven 107',
            "City": 'Rotterdam',
            "Zipcode": '3011AC'
        }
    }, {
        "Address.Address": 'Wijnhaven 99'
    });

    restfultest('products', {
        _id: '588b1ad78ef1aa111cef1c09',
        key: 'Name',
        value: 'Auto'
    }, {
        Name: 'Fiets',
        Description: 'Race fiets',
        Price: 1200,
        Amount: 1,
        Images: [],
        SellerID: '5889f94a70e0b10f738762de',
        Category: '5887510ef902b42a38c2de84',
        CreatedAt: null,
        DeleteAt: null,
        DeliveryMethod: null
    }, {
        Name: 'Bus',
        Price: 100000
    });

    restfultest('categories', {
        _id: '5887510ef902b42a38c2de84',
        key: 'Name',
        value: 'Vervoer'
    }, {
        Name: 'Computers'
    }, {
        Name: 'Audio'
    });

    restfultest('users', {
        _id: '5889f94a70e0b10f738762de',
        key: 'FirstName',
        value: 'Jan'
    }, {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'john@doe.com'
    }, {
        FirstName: 'Robert',
        LastName: 'Rutte'
    })
})
;
