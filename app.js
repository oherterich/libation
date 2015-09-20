var express = require('express');
var directory = require('serve-index');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var fs = require('fs');

var WWW_ROOT = 'www/';
var SOCKET_IO_PORT = 8080;

// io.set('log level', 2);
server.listen(SOCKET_IO_PORT);

app.use(directory(WWW_ROOT));
app.use(express.static(WWW_ROOT));