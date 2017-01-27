const hippie = require('hippie');

module.exports = (route, initialId, testingData) => {
    describe(`/${route} endpoint`, () => {

        it(`POST /${route}`, done => {
            hippie(app)
                .json()
                .post(`/${route}`)
                .send(testingData)
                .expectStatus(201)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        });

        it(`GET /${route}`, done => {
            hippie(app)
                .json()
                .get(`/${route}`)
                .expectStatus(200)
                .end(function(err, res, body) {
                    if (err) throw err;
                    done()
                })
        });

        it(`GET /${route}/${initialId}`, done => {
            hippie(app)
                .json()
                .get(`/${route}/${initialId}`)
                .expectStatus(200)
                .expectHeader('Content-Type', 'application/json')
                .expectValue('FirstName', 'Jan')
                .expectValue('LastName', 'Jansen')
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });

        it(`PUT /${route}/${initialId}`, done => {
            hippie(app)
                .json()
                .put(`/${route}/${initialId}`)
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

        it(`DELETE /${route}/${initialId}`, done => {
            hippie(app)
                .json()
                .del(`/${route}/${initialId}`)
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        })
    })
};
