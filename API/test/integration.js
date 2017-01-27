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

            // Initialize routes
            require('./../routes/bootstrap');

            global.db = db_;

            // Clear old collections
            const users = db.collection('Users');
            const category = db.collection('Categories');
            const products = db.collection('Products');

            users.drop(() => {
                users.insertOne({
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
                }).catch(() => {
                    console.error('Unable to prepare database:');
                    throw new Error(err)
                })
            });

            category.drop(() => {
                category.insertOne({
                    "_id": ObjectId("5887510ef902b42a38c2de84"),
                    "Name": "Vervoer",
                    "ProductIds": []
                }).catch(() => {
                    console.error('Unable to prepare database:');
                    throw new Error(err)
                })
            });

            products.drop(() => {
                products.insertOne({
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
                }).then(() => {
                    done()
                }).catch(() => {
                    console.error('Unable to prepare database:');
                    throw new Error(err)
                })
            })
        })
    });

    describe('/products', () => {
        it('POST /products', done => {
            hippie(app)
                .json()
                .post('/products')
                .send({
                    "Name": 'Fiets',
                    "Description": 'Race fiets',
                    "Price": 1200,
                    "Amount": 1,
                    "Images": [],
                    "SellerID": '5889f94a70e0b10f738762de',
                    "Category": '5887510ef902b42a38c2de84',
                    "CreatedAt": null,
                    "DeleteAt": null,
                    "DeliveryMethod": null
                })
                .expectStatus(201)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        });

        it('GET /products', done => {
            hippie(app)
                .json()
                .get('/products')
                .expectStatus(200)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        })
    });

    restfultest('users', '5889f94a70e0b10f738762de', {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'john@doe.com'
    })
});
