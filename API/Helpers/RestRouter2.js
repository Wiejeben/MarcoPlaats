/**
 * @param server
 * @param {string} prefix
 * @param {RestfulController} controller
 */
module.exports = function(server, prefix, controller) {
    const root = '/' + prefix,
        specific = root + '/:id';

    server.get(root, (req, res, next) => {
        new controller().index(req, res, next)
    });

    server.post(root, (req, res, next) => {
        new controller().create(req, res, next)
    });

    server.put(specific, (req, res, next) => {
        new controller().update(req, res, next)
    });

    server.del(specific, (req, res, next) => {
        new controller().destroy(req, res, next)
    });

    server.get(specific, (req, res, next) => {
        new controller().show(req, res, next)
    });
};
