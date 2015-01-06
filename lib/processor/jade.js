module.exports = makeJade;

var fs = require('fs');
var path = require('path');
var jade = require('jade');

function makeJade(root) {
  var ret = function (request, response, next) {
    if (path.extname(request.url) == '.html') {
      var html_file_path = root + request.url;
      var jade_file_path = root + path.dirname(request.url) +
                           path.basename(request.url, '.html') + '.jade';
      if (fs.existsSync(html_file_path)) {
        fs.readFile(html_file_path,{encoding: "utf8"},function (err, data) {
          if (err) {
            throw err;
          }
          response.end(data);
        });
      } else if(fs.existsSync(jade_file_path)) {
        fs.readFile(jade_file_path,{encoding: "utf8"},function (err, data) {
          if (err) {
            throw err;
          }
          response.end(jade.renderFile(jade_file_path, null));
        });
      } else {
        response.writeHead(404);
        response.end();
      }
    } else {
      next();
    }
  }
  return ret;
}


