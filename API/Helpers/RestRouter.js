module.exports = function(server, prefix, controller) {
    var root = ('/%s', prefix);
    var specific = root + '/:id';

    // Products Start
    server.get(root, controller.Index);
    server.post(root, controller.Create);
    server.put(specific, controller.Update);
    server.del(specific, controller.Delete);
    server.get(specific, controller.Show);
}