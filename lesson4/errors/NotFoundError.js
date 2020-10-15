module.exports = class NotFoundError extends Error {
    constructor(name) {
        super(name);
        this.status = 404;
        this.stack = '';
        this.message = "User isn't found";
    }
}