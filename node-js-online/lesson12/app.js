const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log('Server is listening on port: ', PORT);
});

const io = socketIO(httpServer);

io.on('connection', (socket) => {
  socket.broadcast.emit('newUser');

  console.log('new is connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });
});
