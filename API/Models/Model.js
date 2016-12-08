const _ = require('lodash'),
    assert = require('assert');

module.exports = class Model {
    /**
     * @property {string} table
     * @property {Collection} collection
     * @property {object} schema
     * @property {object} document
     *
     * @param {string} table
     * @param {object} schema
     */
    constructor(table, schema) {
        this.table = table;
        this.collection = db.collection(table);
        this.schema = schema;
        this.document = null;
    }

    /**
     * Format input data to keep documents consistent.
     */
    sanitize() {
        this.document = _.pick(_.defaults(this.document, this.schema), _.keys(this.schema));
    }

    /**
     * Validate whether id is compatible is ObjectId.
     *
     * @param {string} [_id=this.document._id]
     * @return {boolean}
     */
    validateId(_id) {
        var id = (typeof _id !== 'undefined') ?  _id : this.document._id;

        if (!ObjectId.isValid(id)) {
            console.warn('Invalid ObjectId: ' + id);
            return false;
        }

        return true;
    }

    /**
     * Get all documents.
     *
     * @param {function(boolean, object[])} callback
     */
    all(callback) {

        this.collection.find({}).toArray()
            .then(results => {
                callback(true, results)
            })
            .catch(error => {
                callback(false, error)
            })
    }

    /**
     * Get specified document by id.
     *
     * @param {string} id
     * @param {function(boolean, object)} callback
     */
    findById(id, callback) {
        // Clear current document
        this.document = null;

        if (!this.validateId(id)) {
            callback(false, { message: 'Invalid ObjectId' });
            return
        }

        this.collection.findOne({ _id: new ObjectId(id) })
            .then(result => {
                this.document = result;
                callback((result != null), result)
            })
            .catch(error => {
                callback(false, error)
            })
    }

    /**
     * Insert sanitized document.
     *
     * @param {function(boolean, object)} callback
     */
    insert(callback) {
        this.sanitize();

        this.collection.insertOne(this.document)
            .then(result => {
                this.document._id = result.insertedId;
                callback(true, this.document)
            })
            .catch(error => {
                callback(false, this.document)
            })
    }

    /**
     * Update/overwrite specified by id document.
     *
     * @param {function(boolean, object)} callback
     */
    update(callback) {
        if (!this.validateId()) {
            callback(false, { message: 'Invalid ObjectId' });
            return
        }

        this.collection.updateOne({ _id: this.document._id }, { $set: this.document })
            .then(() => {
                callback(true, null)
            })
            .catch(error => {
                callback(false, error)
            })
    }

    /**
     * Permanently delete specified document.
     *
     * @param {function(boolean, object)} callback
     */
    destroy(callback) {
        if (!this.validateId()) {
            callback(false, { message: 'Invalid ObjectId' });
            return
        }

        this.collection.deleteOne({ _id: new ObjectId(this.document._id) })
            .then(result => {
                callback((result.deletedCount >= 1), null)
            })
            .catch(error => {
                callback(false, error)
            })
    }
};
