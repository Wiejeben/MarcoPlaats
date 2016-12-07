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
     * @param {function(object[])} callback
     */
    all(callback) {
        this.collection.find({}).toArray(function(err, result) {
            assert.equal(err, null);
            callback(result)
        })
    }

    /**
     * Get specified document by id.
     *
     * @param {string} id
     * @param {function(boolean)} callback
     */
    findById(id, callback) {
        // Clear current document
        this.document = null;

        if (!this.validateId(id)) {
            callback(false);
            return
        }

        this.collection.findOne({ _id: new ObjectId(id) }, (err, result) => {
            assert.equal(err, null);
            this.document = result;
            callback((result != null))
        })
    }

    /**
     * Insert sanitized document.
     *
     * @param {function} callback
     */
    insert(callback) {
        this.sanitize();

        this.collection.insertOne(this.document, (err, result) => {
            assert.equal(err, null);
            this.document._id = result.insertedId;
            callback()
        })
    }

    /**
     * Update/overwrite specified by id document.
     *
     * @param {function(boolean)} callback
     */
    update(callback) {
        if (!this.validateId()) {
            callback(false);
            return
        }

        this.collection.updateOne({ _id: this.document._id }, { $set: this.document }, (err, result) => {
            assert.equal(err, null);
            callback(true)
        })
    }

    /**
     * Permanently delete specified document.
     *
     * @param {function(boolean)} callback
     */
    destroy(callback) {
        if (!this.validateId()) {
            callback(false);
            return
        }

        this.collection.deleteOne({ _id: new ObjectId(this.document._id) }, (err, result) => {
            assert.equal(err, null);
            callback((result.deletedCount >= 1))
        })
    }
};
