/**
 * @param server
 * @param {string} prefix
 * @param {RestfulController} controller
 */
module.exports = function(server, prefix, controller) {
    const root = '/' + prefix,
        specific = root + '/:id';

    server.get(root, (req, res, next) => {
        new controller(req, res, next).index()
    });

    server.post(root, (req, res, next) => {
        new controller(req, res, next).create()
    });

    server.put(specific, (req, res, next) => {
        new controller(req, res, next).update()
    });

    server.del(specific, (req, res, next) => {
        new controller(req, res, next).destroy()
    });

    server.get(specific, (req, res, next) => {
        new controller(req, res, next).show()
    });
};
