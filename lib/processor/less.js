module.exports = makeLess;

var less = require('less');
var path = require('path');
var fs = require('fs');

function makeLess(root) {
  var ret = function (request, response, next) {
    if (path.extname(request.url) == '.css') {
      var css_file_path = root + request.url;
      var less_file_path = root + path.dirname(request.url) +
                           path.basename(request.url, '.css') + '.less';
      if (fs.existsSync(css_file_path)) {
        fs.readFile(css_file_path,{encoding: "utf8"},function (err, data) {
          if (err) {
            throw err;
          }
          response.end(data);
        });
      } else if(fs.existsSync(less_file_path)) {
        fs.readFile(less_file_path,{encoding: "utf8"},function (err, data) {
          if (err) {
            throw err;
          }
          less.render(data, function (e, output) {
            if (e) {
              throw e;
            }
            response.end(output);
          })
        });
      } else {
        response.statusCode = 404;
        response.end();
      }
    } else {
      next();
    }
  }
  return ret;
}

