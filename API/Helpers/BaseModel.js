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
        this.document = {};
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
     * @param {object} [filter={}]
     * @return {Promise}
     */
    findOne(filter = {}) {
        // Clear current document
        this.document = null;

        return this.find(filter)
            .then(results => {
                if (!results.length) {
                    return Promise.reject(new restify.NotFoundError({
                        message: {
                            collection: this.table,
                            filter: filter
                        }
                    }))
                }

                let result = results[0];
                this.document = result;

                return Promise.resolve(result)
            })
            .catch(Promise.reject)
    }

    /**
     * Generic find that uses this.document.
     *
     * @param {object} [filter={}]
     * @returns {Promise}
     */
    find(filter = {}) {
        // Use aggregation if setup and enabled
        if (typeof this.findWithAggregation == 'function' && this.useAggregation) {
            return this.findWithAggregation(filter)
        }
        
        return this.collection.find(filter).toArray()
    }

    /**
     * Extends insert method from MongoDB.
     *
     * @param {object} [document=this.document]
     * @returns {Promise}
     */
    insert(document = this.document) {
        return this.collection.insertOne(document)
    }

    /**
     * Extends updateOne method from MongoDB.
     *
     * @param {object} filter
     * @param {object} update
     * @returns {Promise}
     */
    update(filter, update) {
        return this.collection.updateOne(filter, update)
    }

    /**
     * Permanently deletes document.
     *
     * @param {object} filter
     * @return {Promise}
     */
    destroy(filter) {
        return this.collection.deleteOne(filter)
    }
};
