module.exports = class RestfulController {
    /**
     * @property {Model} model
     * @param {function} model
     */
    constructor(model) {
        this.model = new model();
    }

    index(req, res, next) {
        this.model.params = req.params;

        this.model.all()
            .then(results => {
                res.send(results)
            })
            .catch(next)
    }

    create(req, res, next) {
        this.model.params = req.params;
        this.model.document = req.body;

        this.model.insert()
            .then(() => {
                res.statusCode = 201;
                res.send(this.model.document);
            })
            .catch(next)
    }

    show(req, res, next) {
        this.model.params = req.params;

        this.model.findById(req.params.id)
            .then(() => {
                res.send(this.model.document)
            })
            .catch(next)
    }

    update(req, res, next) {
        this.model.params = req.params;

        this.model.update()
            .then(() => {
                res.statusCode = 204;
                res.end()
            })
            .catch(next)
    }

    destroy(req, res, next) {
        this.model.params = req.params;

        this.model.findById(req.params.id)
            .then(() => {
                if (this.model.document == null) {
                    res.statusCode = 404;
                    res.end();
                    return
                }

                this.model.destroy()
                    .then(() => {
                        res.statusCode = 204;
                        res.end()
                    })
                    .catch(next)
            })
            .catch(next)
    }
};
