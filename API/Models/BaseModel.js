module.exports = class BaseModel {
    /**
     * @property {Collection} collection
     * @property {string} table
     * @property {object} document
     * @property {object} params
     * @property {boolean} useAggregation
     *
     * @param {string} table
     */
    constructor(table) {
        this.table = table;
        this.collection = db.collection(this.table);
        this.document = null;
        this.params = {};
        this.useAggregation = false
    }

    /**
     * Validate whether id is compatible is ObjectId.
     *
     * @param {string} [id=this.document._id]
     * @return {boolean}
     */
    validateId(id = this.document._id) {
        if (typeof id == 'undefined') return false;

        return ObjectId.isValid(id)
    }

    /**
     * Get all documents.
     *
     * @return {Promise}
     */
    all() {
        return this.find()
    }

    /**
     * Return and apply the first result.
     *
     * @param {Promise} filter
     * @return {Promise}
     */
    findOne(filter) {
        // Clear current document
        this.document = null;

        return new Promise((resolve, reject) => {
            this.find(filter)
                .then(results => {
                    if (!results.length) {
                        return reject(new restify.NotFoundError({ message: { table: this.table, filter: filter } }))
                    }

                    let result = results[0];
                    this.document = result;

                    return resolve(result)
                })
                .catch(err => {
                    return reject(err)
                })
        })


    }

    /**
     * Generic find that uses this.document.
     *
     * @param {object} filter
     * @returns {Promise}
     */
    find(filter) {
        // Use aggregation if setup and enabled
        if (typeof this.findWithAggregation == 'function' && this.useAggregation) {
            return this.findWithAggregation(filter)
        }

        return this.collection.find(filter).toArray()
    }

    /**
     * Extends insert method from MongoDB.
     *
     * @param {object} [doc=this.document]
     * @returns {Promise}
     */
    insert(doc = this.document) {
        return this.collection.insertOne(doc)
    }

    /**
     * Extends insert method from MongoDB.
     *
     * @param {object} filter
     * @param {object} update
     * @returns {Promise}
     */
    update(filter, update) {
        return this.collection.updateOne(filter, update)
    }

    destroy(filter) {
        return this.collection.deleteOne(filter)
    }
};
