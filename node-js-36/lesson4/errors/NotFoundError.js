class NotFoundError extends Error {
    constructor() {
        super();
        this.stack = '';
        this.message = 'Entity is not found';
        this.status = 404;
    }
}

module.exports = NotFoundError;
