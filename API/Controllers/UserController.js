const RestfulController = require('./RestfulController'),
    User = require('./../Models/User');

module.exports = class UserController extends RestfulController {
    constructor() {
        super(User)
    }

    static showByToken(req, res, next) {
        let user = new User();

        user.findByToken(req.headers.authorization)
            .then(() => {
                if (user.document == null) {
                    return Promise.reject(new Error('Unable to find user with specified authorization header'))
                }
                res.send(user.document)
            })
            .catch(err => {
                res.statusCode = 422;
                res.send({ message: err.message })
            })
    }
};
