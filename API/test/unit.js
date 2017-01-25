const test = require('unit.js');
var BaseModel = require("./../Helpers/BaseModel");

// Define globals
global.db = require('./helpers/db');
global.ObjectId = require('mongodb').ObjectId;

// http://unitjs.com/guide/quickstart.html
describe('Unit tests', () => {

    it('Check ObjectId validation', () => {
        test.must(new BaseModel("mock").validateId("this_is_a_fake_objectid")).be.false();
        test.must(new BaseModel("mock").validateId("588863a05c23f611e97ce9b21")).be.true();
    });

    it('Test sanitizer', () => {
        // Test if sanitizer does its job right
    });

});