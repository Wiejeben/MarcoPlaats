const hippie = require('hippie'),
    mongodb = require('mongodb');

require('dotenv').config();
global.integration = true;

let str = process.env.DB_STRING;
let result = str.substring(0, str.lastIndexOf("/"));

require('./../server');

describe('Integration tests', () => {

    before(done => {
        //global.ObjectId = mongodb.ObjectId;
        mongodb.MongoClient.connect(result + "/MarcoPlaatsIntegrationDB", (err, db_) => {
            if (err) {
                console.error('Unable to connect to MongDB:');
                throw new Error(err);
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
                    throw new Error(err);
                });
            })

            category.drop(() => {
                category.insertOne({
                    "_id": ObjectId("5887510ef902b42a38c2de84"),
                    "Name": "Vervoer",
                    "ProductIds": []
                }).catch(() => {
                    console.error('Unable to prepare database:');
                    throw new Error(err);
                });
            })

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
                    throw new Error(err);
                });
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

        it('GET /products', done =>{
            hippie(app)
                .json()
                .get('/products')
                .expectStatus(200)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        });

    })


    describe('/users endpoint', () => {
        it('POST /users', done => {
            hippie(app)
                .json()
                .post('/users')
                .send({
                    FirstName: 'John',
                    LastName: 'Doe',
                    Email: 'john@doe.com'
                })
                .expectStatus(201)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        });

        it('GET /users', done => {
            hippie(app)
                .json()
                .get('/users')
                .expectStatus(200)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        });

        it('GET /users/5889f94a70e0b10f738762de', done => {
            hippie(app)
                .json()
                .get('/users/5889f94a70e0b10f738762de')
                .expectStatus(200)
                .expectHeader('Content-Type', 'application/json')
                .expectValue('FirstName', 'Jan')
                .expectValue('LastName', 'Jansen')
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        })

        it('PUT /users/5889f94a70e0b10f738762de', done => {
            hippie(app)
                .json()
                .put('/users/5889f94a70e0b10f738762de')
                .send({
                    FirstName: 'Robert',
                    LastName: 'Rutte'
                })
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        })

        it('DELETE /users/5889f94a70e0b10f738762de', done => {
            hippie(app)
                .json()
                .del('/users/5889f94a70e0b10f738762de')
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        })

    })
});
