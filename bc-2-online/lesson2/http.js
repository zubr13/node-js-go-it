const http = require('http');

const PORT = 8080;

const server = http.createServer((request, response) => {
    // console.log('url', request.url);
    // console.log('method', request.method);
    // console.log('headers', request.headers);

    let result = '';

    request.on('data', (data) => {
        result += data;
    });

    request.on('end', () => {
        response.end(result);
    });
});

server.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT);
});
