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
                }).then(() => {
                    done()
                }).catch(() => {
                    console.error('Unable to prepare database:');
                    throw new Error(err);
                });
            })
        })
    });

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
    })
});
