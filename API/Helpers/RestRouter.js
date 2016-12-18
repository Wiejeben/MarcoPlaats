/**
 * @param {string} prefix
 * @param {RestfulController} controller
 */
module.exports = function(prefix, controller) {
    const root = '/' + prefix,
        specific = root + '/:id';

    app.get(root, (req, res, next) => {
        new controller(req, res, next).index()
    });

    app.post(root, (req, res, next) => {
        new controller(req, res, next).create()
    });

    app.put(specific, (req, res, next) => {
        new controller(req, res, next).update()
    });

    app.del(specific, (req, res, next) => {
        new controller(req, res, next).destroy()
    });

    app.get(specific, (req, res, next) => {
        new controller(req, res, next).show()
    });
};
