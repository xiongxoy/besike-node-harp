module.exports = makeRewriteURL;

var path = require('path');

function makeRewriteURL() {
  var ret = function (request, response, next) {
    var url = request.url;
    if (path.basename(url).indexOf('.') == -1) {
      if (url[-1] != '/') {
        url += '/';
      }
      url += 'index.html';
      request.url = url;
    }
    next();
  }
  return ret;
}
