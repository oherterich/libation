var express = require('express');
var directory = require('serve-index');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var fs = require('fs');

var WWW_ROOT = 'www/';
var SOCKET_IO_PORT = 8080;

server.listen(SOCKET_IO_PORT);

app.use(directory(WWW_ROOT));
app.use(express.static(WWW_ROOT));

var bookTimer = null;
var bookText = [];
var currentWord = 0;
var bookSpeed = 300;

fs.readFile(WWW_ROOT + '/data/catcher.txt', 'utf8', function (err, data) {
  bookText = data.split(' ');
  bookTimer = setInterval(sendBookText, bookSpeed);
});

io.sockets.on('connection', function (socket) {

});

function sendBookText() {
  var word = bookText[currentWord];
  // io.emit('book-text', word);
  currentWord++;
}