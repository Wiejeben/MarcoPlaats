const test = require('unit.js');
var BaseModel = require("./../Helpers/BaseModel");

require('./../server')

// http://unitjs.com/guide/quickstart.html
describe('Unit tests', () => {

    it('Check ObjectId validation', () => {
        //test.must(BaseModel.validateId("balbalbalbla")).be.false();
    });

    it('Test sanitizer', () => {
        // Test if sanitizer does its job right
    });

});