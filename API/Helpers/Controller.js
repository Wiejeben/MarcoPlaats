module.exports = class Controller {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
};
