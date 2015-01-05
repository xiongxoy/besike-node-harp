#!/usr/bin/env node
var createMiniHarp = require('../');
var parseArgs = require('minimist');

var args = parseArgs(process.argv.slice(2));

var port = args.port || 4000;
var app = createMiniHarp();

app.use(function (request, response, next) {
  var time_request = '/current-time';
  if (request.url.slice(-time_request.length) == time_request) {
    response.end((new Date()).toISOString() + '\n');
  }
});

console.log("Starting mini-harp on http://localhost:" + port);
app.listen(port);
