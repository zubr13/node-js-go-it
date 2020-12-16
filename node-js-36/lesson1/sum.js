function sum(a, b) {
    return parseFloat(a) + parseFloat(b);
}

const [, , first, second] = process.argv;

console.log('sum', sum(first, second));
