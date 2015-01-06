module.exports = createMiniHarp;

var connect = require('connect');
var makeJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');
var makeRewriteURL = require('./lib/processor/rewriteURL');

function createMiniHarp(root) {
  var app = connect();
  app.use(makeRewriteURL());
  app.use(makeJade(root));
  app.use(makeLess(root));

  return app;
}

