var restify = require('restify');

var AutoLoader = require('./Helpers/AutoLoader');
var RestRouter = require('./Helpers/RestRouter');

var server = restify.createServer({
    name:'MarcoPlaats API',
    version: '1.0.0'
});

server.use(restify.fullResponse()).use(restify.bodyParser());

var controllers = AutoLoader('Controllers');

RestRouter(server, 'products', controllers.ProductController);
RestRouter(server, 'users', controllers.UserController);

server.get('/', function (req, res, next){
    res.send('Hello World!');
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});


// Testing data
var User = require('./Models/User');

var user1 = new User({
    name:"Daan",
    age:20
});

var schemas = require('./Models/Schemas');

getKeys = function(obj) {
    var keys = [];
    for (var key in obj.data) keys.push(key);
    return keys;
};

var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
        var length = arguments.length;
        if (length < 2 || obj == null) return obj;
        for (var index = 1; index < length; index++) {
            var source = arguments[index],
                keys = keysFunc(source),
                l = keys.length;
            for (var i = 0; i < l; i++) {
            var key = keys[i];
            if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
            }
        }
    return obj;
    };
};
var defaults = createAssigner(getKeys, true);
defaults(user1, schemas.User);


// test(user1);

console.log('end');