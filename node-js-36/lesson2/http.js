const http = require('http');

const PORT = 8080;

const server = http.createServer((request, response) => {
    // console.log('method', request.method);
    // console.log('headers', request.headers);
    // console.log('url', request.url);

    let body = '';

    request.on('data', (data) => {
        body += data;
    });

    request.on('end', () => {
        response.end(body);
    });
});
server.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT);
});
