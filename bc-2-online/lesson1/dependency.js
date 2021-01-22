const { promises: fsPromises } = require('fs');
const path = require('path');

const a = 2;

// console.log('env', process.env);

// if(process.env.MY_NODE_ENV === 'development') {
//     // run test
// } else {
//     // not run test
// }

function sum(a, b) {
    return parseFloat(a) + parseFloat(b);
}

const [, , number1, number2] = process.argv;

// console.log(sum(number1, number2));

// console.log('dirname', __dirname);
// console.log('filename', __filename);

// fs.writeFile('test.txt', 'Hello from our first application', (err) => {
//     // console.log('err', err);
//     if (err) {
//         console.log('err', err);
//     }
// });

// fs.readFile('test.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log('err', err);
//     }

//     console.log('data', data);
// });

fsPromises.readFile('test.txt', 'utf-8').then((data) => {
    console.log('data', data);
});

async function readMyFile() {
    const data = await fsPromises.readFile('test.txt', 'utf-8');
    console.log('async await data', data);
}

readMyFile();

throw new Error('server is down');

const filePath = path.join(__filename, '../..', './lesson1', '../..');
console.log('filePath', filePath);
console.log('extension', path.extname('./test.txt'));
console.log(path.parse(__filename));

module.exports = {
    a,
};
