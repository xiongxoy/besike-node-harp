#!/usr/bin/env node
var createMiniHarp = require('../');
var parseArgs = require('minimist');

var args = parseArgs(process.argv.slice(2));

var port = args.port || 4000;
var app = createMiniHarp();

console.log("Starting mini-harp on http://localhost:" + port);
app.listen(port);
