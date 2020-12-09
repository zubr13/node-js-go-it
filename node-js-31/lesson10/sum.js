function sum(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        throw new Error("Invalid params");
    }
    return a + b;
}

module.exports = sum;