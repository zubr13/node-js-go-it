class NotFoundError extends Error {
    constructor() {
        super();
        this.message = 'Data is not found';
        this.status = 404;
        this.stack = '';
    }
}

module.exports = NotFoundError;
