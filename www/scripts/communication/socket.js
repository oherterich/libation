var socket = io.connect('http://' + window.location.hostname + ':8080');
socket.on('connect', function() {
  console.log('connected!')
});

socket.on('book-text', function(data) {
  document.querySelector('.book').innerHTML = data;
});