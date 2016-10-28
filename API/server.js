// grap dependencies

var restify = require('restify');
var fs = require('fs');

var controllers = {}
    , controllers_path = process.cwd() + '/controllers'
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})




var Product = require("./Models/product.js");
var Image = require("./Models/image.js");

var product1 = new Product({
    _id:1,
    Name:"Fiets",
    Description:"Dit is een hele mooie fiets",
    Price:700.10,
    Amount:50,
    Properties: ["Mooi", "snel"],
    Images: [
        new Image({_id:1, Filename:"foto1.jgp"}),
        new Image({_id:2, Filename:"foto2.jgp"})
        ],
    PublishDate: new Date().getDate(),
    Deleted:false
});


var server = restify.createServer({
    name:"marcoplaats",
    version: '1.0.0'
});

server
    .use(restify.fullResponse())
    .use(restify.bodyParser())


// Products Start
server.get("/products", controllers.ProductController.Index)
server.post("/products", controllers.ProductController.Create)
server.put("/products/:id", controllers.ProductController.Update)
server.del("/products/:id", controllers.ProductController.Delete)
server.get("/products/:id", controllers.ProductController.Show)
// Products End




server.get("/", function (req, res, next){
    res.send(controllers);
});

server.listen(8080, function() {
    console.log("%s listening at %s", server.name, server.url);
});