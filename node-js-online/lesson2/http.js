const http = require('http');

const PORT = 8080;

const server = http.createServer((req, res) => {
    // console.log('req method', req.method);
    // console.log('headers', req.headers);
    // console.log('path', req.url);
    let body = '';

    req.on('data', (data) => {
        body += data;
        console.log('data', data);
    });

    req.on('end', () => {
        res.end(body);
    });
});

server.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
});
