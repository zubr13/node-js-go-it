const express = require('express');

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

app.get('/users', (req, res) => {
    res.send('Users data');
});

app.post('/users', (req, res) => {
    console.log('body', req.body);
    res.send(req.body);
});

app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
});
