const express = require('express');

const PORT = 8080;

const server = express();

server.use(express.json());
server.use(express.static('public'));
server.use(express.urlencoded());

server.get(
    '/users',
    (req, res, next) => {
        console.log('Hello from middleware users');
        next();
    },
    (req, res) => {
        res.send('Hello from users route');
    }
);

server.post('/comments', (req, res) => {
    console.log('body', req.body);
    res.send(req.body);
});

server.get('/comments', (req, res) => {
    res.send(req.body);
});

server.listen(PORT, () => {
    console.log('Server is listening on PORT: ', PORT);
});
