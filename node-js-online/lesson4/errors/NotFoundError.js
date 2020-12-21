class NotFoundError extends Error {
    constructor() {
        super();
        this.stack = '';
        this.status = 404;
        this.message = 'Your entity is not found';
    }
}

module.exports = NotFoundError;
