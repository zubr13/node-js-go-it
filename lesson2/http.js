const http = require("http");

const PORT = 8080;

const server = http.createServer((req, res) => {
  console.log("headers", req.headers);
  console.log("url", req.url);
  console.log("method", req.method);
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    res.end(body);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
