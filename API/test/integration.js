const hippie = require('hippie'),
    mongodb = require('mongodb');
require('dotenv').config();
global.integration = true;

var str = process.env.DB_STRING;
var result = str.substring(0, str.lastIndexOf("/"));

global.ObjectId = mongodb.ObjectId;
require('./../server');
mongodb.MongoClient.connect(result + "/MarcoPlaatsIntegrationDB", function(err, db_) {
    if (err) {
        console.error('Unable to connect to MongDB:');
        throw new Error(err);
    }

    // Initialize routes
    require('./../routes/bootstrap');

    global.db = db_;

    // Clear old collections
    db.collection('Users').drop();
    
    describe('Integration tests', function () {
        describe('/users endpoint', function () {

            it('POST /users', function (done) {
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

            it('POST /users', function (done) {
                hippie(app)
                    .json()
                    .post('/users')
                    .send({
                        FirstName: 'Jan',
                        LastName: 'Jansen',
                        Email: 'jan@jansen.com'
                    })
                    .expectStatus(201)
                    .end(function(err, res, body) {
                        if (err) throw err;
                        done()
                    })
            });

            it('GET /users', function (done) {
                hippie(app)
                    .json()
                    .get('/users')
                    .expectStatus(200)
                    .end(function(err, res, body) {
                        if (err) throw err;
                        done();
                    });
            });
            // TODO: Find a way to use the generated ObjectId
            //it('returns a user based on the id', function (done) {
            //    hippie(app)
            //        .json()
            //        .get('/users/588863a05c23f611e97ce9b2')
            //        .expectStatus(200)
            //        .expectHeader('Content-Type', 'application/json')
            //        .expectValue('FirstName', 'John')
            //        .end(function(err, res, body) {
            //            if (err) throw err;
            //            done();
            //        });
            //});
        });
    });
});