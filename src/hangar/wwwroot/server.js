// this file must reside on the node js folder or where the modules reside

var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("../../hangar");

var server = http.createServer(function (req, res) {
    var done = finalhandler(req, res)
    serve(req, res, done)
});

server.listen(5000);