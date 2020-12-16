const example = require('./example');
const { promises: fsPromises } = require('fs');
const path = require('path');

// fs.writeFile('test.txt', 'Hello first file', (err) => {
//     if (err) {
//         console.log('err', err);
//     }
//     console.log('Finish');
// });
// fs.writeFileSync();
// fs.readFile('test.txt', 'utf-8', (err, data));
// throw new Error('Server is down');
fsPromises.readFile('test.txt', 'utf-8').then((data) => {
    console.log('data', data);
});

//console.log('process', process);
// process.exit(0);
console.log('env', process.env.NODE_ENV);
console.log('example', example);

// if (process.env.NODE_ENV === 'development') {
//     // run tests
// } else {
//     //
// }

console.log('dirname', __dirname);
console.log('filename', __filename);

console.log('arguments', process.argv);

const result = path.join(__dirname, '../..', './node-js-offline');
// const result = '~/projects/node-js-go-it/node-js-offline/lesson1';
console.log('result', result);
