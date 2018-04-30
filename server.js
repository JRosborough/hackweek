console.log("server is starting")
var http = require('http');
var path = require('path');
var fs = require('fs');



var server = http.createServer(handleRequest);
server.listen(8080);
console.log('server on 8080');

function handleRequest(req, res) {
  // What did we request?
  var pathname = req.url;

  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/public/index.html';
  }

  // Ok what's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  // What is it?  Default to plain text
  var contentType = typeExt[ext] || 'text/plain';

  // Now read and write back the file with the appropriate content type
  fs.readFile(__dirname + pathname,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Dynamically setting content type
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}


// this bit is socket specific
var io = require('socket.io').listen(server);

io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {

    console.log("We have a new client: " + socket.id);

    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('mouse',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Someone new is drawing")
      //  console.log(data.video)
        // Send it to all other clients

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
      socket.broadcast.emit('mouse',data);
      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);
