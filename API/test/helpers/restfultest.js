const hippie = require('hippie');

module.exports = (route, expectedValue, insertData, updateData) => {
    describe(`/${route} endpoint`, () => {

        it(`POST /${route}`, done => {
            hippie(app)
                .json()
                .post(`/${route}`)
                .send(insertData)
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

        it(`GET /${route}/${expectedValue._id}`, done => {
            hippie(app)
                .json()
                .get(`/${route}/${expectedValue._id}`)
                .expectStatus(200)
                .expectHeader('Content-Type', 'application/json')
                .expectValue('_id', expectedValue._id)
                .expectValue(expectedValue.key, expectedValue.value)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });

        it(`PUT /${route}/${expectedValue._id}`, done => {
            hippie(app)
                .json()
                .put(`/${route}/${expectedValue._id}`)
                .send(updateData)
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        });

        it(`DELETE /${route}/${expectedValue._id}`, done => {
            hippie(app)
                .json()
                .del(`/${route}/${expectedValue._id}`)
                .expectStatus(204)
                .end((err, res, body) => {
                    if (err) throw err;
                    done()
                })
        })
    })
};
