const Controller = require('./../Helpers/Controller')

module.exports = class RestfulController extends Controller {
    /**
     * @property {Model} model
     * @property {object} req
     * @property {object} res
     * @property {function} next
     *
     * @param {function} model
     * @param {object} req
     * @param {object} res
     * @param {function} next
     */
    constructor(model, req, res, next) {
        super(req, res, next)
        this.model = new model()
    }

    index() {
        this.model.params = this.req.params;

        this.model.all()
            .then(results => {
                this.res.send(results)
            })
            .catch(this.next)
    }

    create() {
        this.model.params = this.req.params;
        this.model.document = this.req.body;
        
        this.model.insert()
            .then(() => {
                this.res.statusCode = 201;
                this.res.send(this.model.document);
            })
            .catch(this.next)
    }

    show() {
        this.model.params = this.req.params;

        this.model.findById(this.req.params.id)
            .then(() => {
                this.res.send(this.model.document)
            })
            .catch(this.next)
    }

    update() {
        this.model.params = this.req.params;
        this.model.document = this.req.body;
        this.model.document._id = this.req.params.id;

        this.model.update()
            .then(() => {
                this.res.statusCode = 204;
                this.res.end()
            })
            .catch(this.next)
    }

    destroy() {
        this.model.params = this.req.params;

        this.model.findById(this.req.params.id)
            .then(() => {
                return this.model.destroy()
                    .then(() => {
                        this.res.statusCode = 204;
                        this.res.end()
                    })
                    .catch(this.next)
            })
            .catch(this.next)
    }
};
