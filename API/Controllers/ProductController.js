exports.Index = function(req, res, next){
    res.send("Return all");
}

exports.Create = function(req, res, next){
    res.send("create");
}

exports.Show = function(req, res, next) {
    res.send("show " + req.params.id);
}

exports.Update = function(req, res, next) {
    res.send("Update" + req.params.id);
}

exports.Delete = function(req, res, next) {
    res.send("Delete " + req.params.id);
}