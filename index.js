module.exports = createMiniHarp;

var connect = require('connect');
var makeJade = require('./lib/processor/jade');

function createMiniHarp(root) {
  var app = connect();
  app.use(makeJade(root));
  return app;
}

