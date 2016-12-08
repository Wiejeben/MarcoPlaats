/**
 * @param server
 * @param {string} prefix
 * @param {RestfulController} controller
 */
module.exports = function(server, prefix, controller) {
	let root = ('/%s', prefix),
		specific = root + '/:id',
		control = new controller();

	// Products Start
	server.get(root, (req, res, next) => {
		control.index(req, res, next)
	});

	server.post(root, (req, res, next) => {
		control.create(req, res, next)
	});

	server.put(specific, (req, res, next) => {
		control.update(req, res, next)
	});

	server.del(specific, (req, res, next) => {
		control.destroy(req, res, next)
	});

	server.get(specific, (req, res, next) => {
		control.show(req, res, next)
	});
};
