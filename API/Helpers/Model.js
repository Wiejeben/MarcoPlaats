const _ = require('lodash'),
    assert = require('assert'),
    BaseModel = require('./BaseModel');

module.exports = class Model extends BaseModel {
    /**
     * @property {object} schema
     * @property {boolean} hasCreatedAt
     * @property {boolean} hasDeletedAt
     *
     * @param {string} table
     * @param {object} schema
     */
    constructor(table, schema) {
        super(table);
        this.schema = schema;

        this.hasCreatedAt = false;
        this.hasDeletedAt = false; // TODO: Figure out if we still need to implement soft deletes
    }

    /**
     * Format input data to keep documents consistent.
     *
     * @return void
     */
    sanitize() {
        this.document = _.pick(_.defaults(this.document, this.schema), _.keys(this.schema))
    }

    /**
     * Get specified document by id.
     *
     * @param {string} id
     * @return {Promise}
     */
    findById(id) {
        if (!this.validateId(id)) return Promise.reject(new Error('Invalid ObjectId'));

        return this.findOne({ _id: new ObjectId(id) })
    }

    /**
     * Get array of documents based on an array of ObjectIds.
     *
     * @param {string[]} productIds
     * @return {Promise}
     */
    findManyById(productIds) {
        // console.log(productIds)
        // return this.find( {_id: { $all: _.map(productIds, _.ary(new ObjectId))}})
        let objectIds = [];

        // Transform into ObjectIds
        productIds.forEach(result => {
            objectIds.push(new ObjectId(result))
        });

        return this.find({ _id: { $in: objectIds } })
    }

    /**
     * Insert sanitized document.
     *
     * @return {Promise}
     */
    insert() {
        this.sanitize();

        if (this.hasCreatedAt) this.document.CreatedAt = Math.floor(new Date() / 1000);
        
        const promise = super.insert();

        // Apply new document _id
        promise.then(result => {
            this.document._id = result.insertedId
        });

        return promise
    }

    /**
     * Update/overwrite specified by id document.
     *
     * @return {Promise}
     */
    update() {
        let id = this.params.id;

        // Fallback to document _id
        if (typeof id === 'undefined') {
            id = this.document._id;
        }

        this.sanitize();

        if (!this.validateId(id)) return Promise.reject(new Error('Invalid ObjectId'));

        // Remove _id to prevent it from being altered
        delete this.document._id;
        
        return super.update({ _id: new ObjectId(id) }, { $set: this.document })
    }

    /**
     * Permanently delete specified document.
     *
     * @return {Promise}
     */
    destroy() {
        this.sanitize();

        let id = this.params.id;
        if (!this.validateId(id)) return Promise.reject(new Error('Invalid ObjectId'));

        if(this.hasDeletedAt) { 
            this.document.DeletedAt = Math.floor(new Date() / 1000)
            return this.update()
        }

        return super.destroy({ _id: new ObjectId(this.document._id) })
    }
};
