const express = require('express');

const PORT = 8080;

const app = express();

app.use(setCookies);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', (req, res) => {
    res.send('Very important data about users');
});

app.post('/comments', (req, res) => {
    res.send(req.body);
});

function setCookies(req, res, next) {
    console.log('Hello from middleware');
    res.set('cookies', 'name=John');
    next();
}

app.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT);
});
