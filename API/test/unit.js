const test = require('unit.js'),
    BaseModel = require('./../Helpers/BaseModel'),
    Model = require('./../Helpers/Model'),
    Authenticatable = require('./../Models/Authenticatable');

// Define globals
global.db = require('./helpers/db');
global.ObjectId = require('mongodb').ObjectId;

// Environmental variable
process.env.APP_KEY = "mock";

// http://unitjs.com/guide/quickstart.html
describe('Unit tests', () => {

    it('Check ObjectId validation', () => {
        const model = new BaseModel("mock");

        test.must(model.validateId("this_is_a_fake_objectid")).be.false();
        test.must(model.validateId("588863a05c23f611e97ce9b2")).be.true()
    });

    it('Check encryption', () => {
        const model = new Authenticatable("mock", {});

        test.string(model.encryptToken("abc")).is("054923")
    });

    it('Check decryption', () => {
        const model = new Authenticatable("mock", {});

        test.string(model.decryptToken("054923")).is("abc")
    });

    it('Test sanitizer', () => {
        const schema = {
            Name: null,
            Description: null,
            Price: null,
            Amount: null,
            Images: [],
            SellerID: null,
            CreatedAt: null,
            DeletedAt: null,
            DeliveryMethod: null
        };

        const model = new Model("mock", schema);

        // Values
        model.document = {
            Name: "Bike",
            Description: "New bike",
            Price: 300,
            Amount: 1,
            SellerID: "58208d29f62ed51b5c78f2a1",
            CreatedAt: null,
            DeletedAt: null,
            DeliveryMethod: null
        };

        // Expected after sanitation
        const expected = {
            Name: "Bike",
            Description: "New bike",
            Price: 300,
            Amount: 1,
            Images: [],
            SellerID: "58208d29f62ed51b5c78f2a1",
            CreatedAt: null,
            DeletedAt: null,
            DeliveryMethod: null
        };

        model.sanitize();

        test.object(model.document).match(expected)
    });

});