const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const PORT = 8080;

const app = express();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
const httpServer = http.Server(app);
const io = socketIO(httpServer);

let counter = 0;

io.on('connection', (socket) => {
  counter++;
  console.log('User is connected');
  socket.broadcast.emit('newUser', `User with id ${counter} is connected`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('removeMessage', (msg) => {
    io.emit('chatMessage', msg);
  });
});

httpServer.listen(PORT, () => {
  console.log('Server is listening on port', PORT);
});
