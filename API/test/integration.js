//const hippie = require('hippie');
//require('dotenv').config();
//global.integration = true;
//
//var str = process.env.DB_STRING;
//var result = str.substring(0, str.lastIndexOf("/"));
//process.env.DB_STRING = result + "/MarcoPlaatsIntegrationDB";
//
//require('./../server');
//
//describe('Integration tests', function () {
//    describe('/users endpoint', function () {
//
//        it('Insert first user', function (done) {
//            hippie(app)
//                .json()
//                .post('/users')
//                .send({
//                    FirstName: 'John',
//                    LastName: 'Doe',
//                    Email: 'john@doe.com'
//                })
//                .expectStatus(201)
//                .end(function(err, res, body) {
//                    if (err) throw err;
//                    done()
//                })
//        });
//
//        it('Insert first user', function (done) {
//            hippie(app)
//                .json()
//                .post('/users')
//                .send({
//                    FirstName: 'Jan',
//                    LastName: 'Jansen',
//                    Email: 'jan@jansen.com'
//                })
//                .expectStatus(201)
//                .end(function(err, res, body) {
//                    if (err) throw err;
//                    done()
//                })
//        });
//
//        it('returns all users', function (done) {
//            hippie(app)
//                .json()
//                .get('/users')
//                .expectStatus(200)
//                .end(function(err, res, body) {
//                    if (err) throw err;
//                    done();
//                });
//        });
//        //
//        //it('returns a user based on the id', function (done) {
//        //    hippie(app)
//        //        .json()
//        //        .get('/users/588863a05c23f611e97ce9b2')
//        //        .expectStatus(200)
//        //        .expectHeader('Content-Type', 'application/json')
//        //        .expectValue('FirstName', 'Maarten')
//        //        .end(function(err, res, body) {
//        //            if (err) throw err;
//        //            done();
//        //        });
//        //});
//    });
//});