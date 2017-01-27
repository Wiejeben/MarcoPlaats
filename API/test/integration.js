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
            const orders = db.collection('Orders');

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
                }).catch(() => {
                    console.error('Unable to prepare database:');
                    throw new Error(err);
                });
            })

            orders.drop(() => {
                orders.insertOne({
                    "_id": ObjectId("588751a9f902b42a38c2de87"),
                    "OrderLines":[{
                        "ProductId": ObjectId("588b1ad78ef1aa111cef1c09"),
                        "Amount": 1
                    }],
                    "OrderDate": null,
                    "userId": ObjectId("5889f94a70e0b10f738762de"),
                    "Address":{
                        "Address": 'Marcoplein 1',
                        "City": 'Rotterdam',
                        "Zipcode": '3000AA'
                    }
                }).then(() => {
                    done()
                }).catch(() => {
                    console.error('Unable to prepare database:');
                    throw new Error(err);
                });
            })
        })
    });

    describe('/orders', () => {
        it('POST /orders', done => {
            hippie(app)
                .json()
                .post('/orders')
                .send({
                    "OrderLines":[{
                        "ProductId": ObjectId("588b1ad78ef1aa111cef1c09"),
                        "Amount": 1
                    }],
                    "OrderDate": null,
                    "userId": ObjectId("5889f94a70e0b10f738762de"),
                    "Address":{
                        "Address": 'Wijnhaven 107',
                        "City": 'Rotterdam',
                        "Zipcode": '3011AC'
                    }
                })
                .expectStatus(201)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        });

        it('GET /orders', done =>{
            hippie(app)
                .json()
                .get('/products')
                .expectStatus(200)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        });

        it('GET /orders/588751a9f902b42a38c2de87', done => {
            hippie(app)
                .json()
                .get('/orders/588751a9f902b42a38c2de87')
                .expectStatus(200)
                .expectHeader('Content-Type', 'application/json')
                .expectValue('Address.Address', 'Marcoplein 1')
                .expectValue('Address.City', 'Rotterdam')
                .expectValue('Address.Zipcode', '3000AA')
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });

         it('PUT /orders/588751a9f902b42a38c2de87', done => {
            hippie(app)
                .json()
                .put('/orders/588751a9f902b42a38c2de87')
                .send({
                    "Address.Address": 'Wijnhaven 99'
                })
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });

        it('DELETE /orders/588751a9f902b42a38c2de87', done => {
            hippie(app)
                .json()
                .del('/orders/588751a9f902b42a38c2de87')
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });

    })

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

        it('GET /products/588b1ad78ef1aa111cef1c09', done => {
            hippie(app)
                .json()
                .get('/products/588b1ad78ef1aa111cef1c09')
                .expectStatus(200)
                .expectHeader('Content-Type', 'application/json')
                .expectValue('Name', 'Auto')
                .expectValue('Price', 25000)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });

        it('PUT /products/588b1ad78ef1aa111cef1c09', done => {
            hippie(app)
                .json()
                .put('/products/588b1ad78ef1aa111cef1c09')
                .send({
                    Name: 'Bus',
                    Price: 100000
                })
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });

        it('DELETE /products/588b1ad78ef1aa111cef1c09', done => {
            hippie(app)
                .json()
                .del('/products/588b1ad78ef1aa111cef1c09')
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });
    })

    describe('/categories', () => {
        it('POST /categories', done => {
            hippie(app)
                .json()
                .post('/categories')
                .send({
                    Name: 'Computers'
                })
                .expectStatus(201)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        });

        it('GET /categories', done => {
            hippie(app)
                .json()
                .get('/categories')
                .expectStatus(200)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        });

        it('GET /categories/5887510ef902b42a38c2de84', done => {
            hippie(app)
                .json()
                .get('/categories/5887510ef902b42a38c2de84')
                .expectStatus(200)
                .expectHeader('Content-Type', 'application/json')
                .expectValue('Name', 'Vervoer')
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });

        it('PUT /categories/5887510ef902b42a38c2de84', done => {
            hippie(app)
                .json()
                .put('/categories/5887510ef902b42a38c2de84')
                .send({
                    Name: 'Audio'
                })
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });

        it('DELETE /categories/5887510ef902b42a38c2de84', done => {
            hippie(app)
                .json()
                .del('/categories/5887510ef902b42a38c2de84')
                .expectStatus(204)
                .end((err, res, body) => {
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
        });

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
        });

        it('DELETE /users/5889f94a70e0b10f738762de', done => {
            hippie(app)
                .json()
                .del('/users/5889f94a70e0b10f738762de')
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });
    })
});
