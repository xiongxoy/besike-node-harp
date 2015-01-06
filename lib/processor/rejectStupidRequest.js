module.exports = makeRejectStupidRequest;

var path = require('path');

function makeRejectStupidRequest() {
  var ret = function (request, response, next) {
    var ext = path.extname(request.url);

    if (ext == '.jade' || ext == '.less') {
      response.statusCode = 404;
      response.end();
    }
    next();
  }
  return ret;
}
