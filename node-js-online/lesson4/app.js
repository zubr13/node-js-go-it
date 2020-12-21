const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.route');

const PORT = 8080;

class Server {
    constructor() {
        this.server = null;
    }

    start() {
        this.server = express();
        this.initMiddlewares();
        this.initRoutes();
        this.listen();
    }

    initMiddlewares() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    initRoutes() {
        this.server.use('/users', userRoutes);
    }

    listen() {
        this.server.listen(PORT, () => {
            console.log('Server is listening on port: ', PORT);
        });
    }
}

const server = new Server();
server.start();
