const express = require('express');

const PORT = 8080;

const app = express();

app.use((req, res, next) => {
  console.log('Global middleware for all routes');
  next();
});

app.get(
  '/',
  (req, res, next) => {
    console.log('First middleware only for root route');
    next();
  },
  (req, res, next) => {
    console.log('Second middleware only for root route');
    next();
  },
  (req, res) => {
    res.send('root');
  }
);

app.get('/users', processUsers, (req, res) => {
  res.send('user');
});

app.get('/users/:id', (req, res) => {
  res.send('user');
});

function processUsers(req, res, next) {
  next();
}

app.get('/comments', (req, res) => {
  res.send('comments');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
