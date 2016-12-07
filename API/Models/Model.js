const _ = require('lodash'),
    assert = require('assert');

module.exports = class Model {
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
     * @param _id
     * @return boolean
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
     * @param callback
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
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Clear current document
        this.document = null;

        if (!this.validateId(id)) {
            callback(false, null);
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
     * @param callback
     */
    insert(callback) {
        this.sanitize();

        this.collection.insertOne(this.document, (err, result) => {
            assert.equal(err, null);
            this.document._id = result.insertedId;
            callback(this.document)
        })
    }

    /**
     * Update/overwrite specified by id document.
     *
     * @param callback
     */
    update(callback) {
        if (!this.validateId()) {
            callback();
            return
        }

        this.collection.updateOne({ _id: this.document._id }, { $set: this.document }, (err, result) => {
            assert.equal(err, null);
            callback()
        })
    }

    /**
     * Permanently delete specified document.
     *
     * @param callback
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
