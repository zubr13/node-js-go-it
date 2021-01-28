const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
// const commentsRouter = require('./routes/comment.routes');

const PORT = process.env.port || 8080;

class Server {
    start() {
        this.server = express();
        this.initMiddlewares();
        this.initRoutes();
        this.listen();
    }

    initMiddlewares() {
        this.server.use(express.json());
        this.server.use(
            cors({
                origin: '*',
            })
        );
    }

    initRoutes() {
        this.server.use('/users', userRouter);
        //this.server.use('/comments', commentsRouter);
    }

    listen() {
        this.server.listen(PORT, () => {
            console.log('Server is listening on port: ', PORT);
        });
    }
}

const server = new Server();
server.start();
