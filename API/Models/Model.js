const _ = require('lodash'),
	assert = require('assert');

module.exports = class Model {
	/**
	 * @property {string} table
	 * @property {Collection} collection
	 * @property {object} schema
	 * @property {object} document
	 * @property {boolean} hasCreatedAt
	 * @property {boolean} hasDeletedAt
	 *
	 * @param {string} table
	 * @param {object} schema
	 */
	constructor(table, schema) {
		this.table = table;
		this.collection = db.collection(table);
		this.schema = schema;
		this.document = null;

		this.hasCreatedAt = false;
		this.hasDeletedAt = false; // TODO: Figure out if we still need to implement soft deletes
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
	 * @param {string} [id=this.document._id]
	 * @return {boolean}
	 */
	validateId(id) {
		id = (typeof id !== 'undefined') ? id : this.document._id;

		if (typeof typeof id == 'undefined') {
			return false;
		}

		return ObjectId.isValid(id)
	}

	/**
	 * Get all documents.
	 *
	 * @return {Promise}
	 */
	all() {
		return this.collection.find().toArray()
	}

	/**
	 * Get specified document by id.
	 *
	 * @param {string} id
	 * @return {Promise}
	 */
	findById(id) {
		// Clear current document
		this.document = null;

		if (!this.validateId(id)) return Promise.reject(new Error('Invalid ObjectId'));

		const promise = this.collection.findOne({ _id: new ObjectId(id) });

		// Apply results to document
		promise.then(result => {
			this.document = result;
		});

		return promise
	}

	/**
	 * Insert sanitized document.
	 *
	 * @return {Promise}
	 */
	insert() {
		this.sanitize();

		if (this.hasCreatedAt) this.document.CreatedAt = Math.floor(new Date() / 1000);

		const promise = this.collection.insertOne(this.document);

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
		if (!this.validateId()) return Promise.reject(new Error('Invalid ObjectId'));

		return this.collection.updateOne({ _id: this.document._id }, { $set: this.document })
	}

	/**
	 * Permanently delete specified document.
	 *
	 * @return {Promise}
	 */
	destroy() {
		if (!this.validateId()) return Promise.reject(new Error('Invalid ObjectId'));

		return this.collection.deleteOne({ _id: new ObjectId(this.document._id) })
	}
};
