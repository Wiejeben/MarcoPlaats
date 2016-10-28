var fs = require('fs');

module.exports = function(folder)
{
    var files = {}
        , files_path = process.cwd() + '/' + folder;
    fs.readdirSync(files_path).forEach(function (file) {
        if (file.indexOf('.js') != -1) {
            files[file.split('.')[0]] = require(files_path + '/' + file)
        }
    });

    return files;
};