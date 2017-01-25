const test = require('unit.js');
var BaseModel = require("./../Helpers/BaseModel");
var Model = require("./../Helpers/Model");

var schema = require("./helpers/schema");

// Define globals
global.db = require('./helpers/db');
global.ObjectId = require('mongodb').ObjectId;

// http://unitjs.com/guide/quickstart.html
describe('Unit tests', () => {

    it('Check ObjectId validation', () => {
        test.must(new BaseModel("mock").validateId("this_is_a_fake_objectid")).be.false();
        test.must(new BaseModel("mock").validateId("588863a05c23f611e97ce9b2")).be.true();
    });

    it('Test sanitizer', () => {
        var model = new Model("mock", schema);

        model.document = {
            Name: "Bike",
            Description: "New bike",
            Price: 300,
            Amount: 1,
            SellerID: "58208d29f62ed51b5c78f2a1",
            CreatedAt: null,
            DeletedAt: null,
            DeliveryMethod: null
        }

        model.sanitize();

        var expected = {
            Name: "Bike",
            Description: "New bike",
            Price: 300,
            Amount: 1,
            Images: [],
            SellerID: "58208d29f62ed51b5c78f2a1",
            CreatedAt: null,
            DeletedAt: null,
            DeliveryMethod: null
        }

        test.object(model.document).match(expected);
    });

});