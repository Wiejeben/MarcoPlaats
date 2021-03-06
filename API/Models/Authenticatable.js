const Model = require('./../Helpers/Model'),
    crypto = require('crypto');

module.exports = class Authenticatable extends Model {
    constructor(table, schema) {
        super(table, schema)
    }

    /**
     * Encrypt authentication token.
     *
     * @param {string} value
     * @return {string}
     */
    encryptToken(value) {
        let cipher = crypto.createCipher('aes-256-ctr', process.env.APP_KEY);

        return cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
    }

    /**
     *  Decrypt authentication token.
     *
     * @param {string} token
     * @returns {string}
     */
    decryptToken(token) {
        try {
            let decipher = crypto.createDecipher('aes-256-ctr', process.env.APP_KEY);

            return decipher.update(token, 'hex', 'utf8') + decipher.final('utf8');
        } catch (ex) {
            return null;
        }
    }

    /**
     * Process OAuth handshake (via Passport authentication routes).
     *
     * @param {object} profile
     * @param {function} callback
     */
    insertFromGoogle(profile, callback) {
        const token = this.encryptToken(profile.id);

        this.findByToken(profile.id, false)
            .then(() => {
                // Role check
                if (this.document.Role == 'blocked') return callback('blocked');

                return callback(token)
            })
            .catch(err => {
                // Set document data
                this.document = {
                    FirstName: profile.name.givenName,
                    LastName: profile.name.familyName,
                    OAuthId: profile.id,
                    Email: profile.emails[0].value,
                    // Apply default role
                    Role: 'admin'
                };

                // Apply to database (use ugly callback for Passport)
                return this.insert()
                    .then(() => {
                        return callback(token)
                    })
                    .catch(() => {
                        return callback('undefined')
                    });
            })
    }

    /**
     * Get specified document by id.
     *
     * @param {string} token
     * @param {boolean} [isEncrypted=true]
     * @return {Promise}
     */
    findByToken(token, isEncrypted = true) {
        if (typeof token == 'undefined') return Promise.reject(new restify.UnauthorizedError('Authorization header undefined'));

        let oAuthId = (isEncrypted) ? this.decryptToken(token) : token;
        if (!oAuthId) return Promise.reject(new restify.UnauthorizedError('Invalid authorization token'));

        return this.findOne({ OAuthId: oAuthId })
    }

    /**
     * Passport middleware.
     *
     * @param {object} req
     * @param {object} res
     * @param {function} next
     */
    static mustBeAuthenticated(req, res, next) {
        const User = require('./User');
        const user = new User();
        user.findByToken(req.headers.authorization)
            .then(() => {
                res.user = user;

                return next();
            })
            .catch(next)
    }

    /**
     * Passport middleware.
     *
     * @param {object} req
     * @param {object} res
     * @param {function} next
     */
    static canBeAuthenticated(req, res, next) {
        const User = require('./User');
        const user = new User();
        user.findByToken(req.headers.authorization)
            .then(() => {
                res.user = user;
                global.loggedInUser = user;

                return next()
            })
            .catch(() => {
                return next()
            })
    }
};
