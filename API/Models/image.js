/** image.js **/

var Image = function (data) {  
    this.data = data;
}

Image.prototype.data = {}

Image.prototype.changeName = function (name) {  
    this.data.name = name;
}

Image.findById = function (id, callback) {  
    db.get('Images', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new Image(data));
    });
}

module.exports = Image;