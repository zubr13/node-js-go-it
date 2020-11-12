const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = 8000;

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

let counter = 0;

io.on("connection", (socket) => {
  console.log("a user connected");
  counter++;
  const id = counter;
  socket.id = id;
  // console.log("socket", socket);
  socket.broadcast.emit("userConnected", id);

  socket.on("chatMessage", (message) => {
    console.log("message", message);
    io.emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("user is disconnected");
  });
});

http.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
