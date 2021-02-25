const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const httpServer = http.Server(app);

const io = socketIo(httpServer);

let count = 0;

io.on('connection', (socket) => {
  console.log('New user is connected');

  socket.on('disconnect', () => {
    console.log('User is disconnected');
    count--;
  });

  socket.on('chatMessage', (message) => {
    io.emit('chatMessage', message);
  });

  count++;
  socket.broadcast.emit('userConnected', count);
});

httpServer.listen(PORT, () => {
  console.log('Server is listening on port', PORT);
});
