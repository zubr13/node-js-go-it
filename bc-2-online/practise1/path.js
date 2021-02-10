const { promises: fsPromises } = require('fs');
const path = require('path');

start();

async function start() {
  // await fsPromises.writeFile('./example.txt', 'Hello');
  // if (windows) {
  //   await fsPromises.writeFile('C:\\data\example.txt', 'Hello');
  // } else
  //   await fsPromises.writeFile('/data/example.txt', 'Hello');
  // }
  // await fsPromises.writeFile(path.join('/data', 'example.txt'));

  console.log(__dirname);
  console.log(__filename);
  //await fsPromises.writeFile(path.join(__dirname, 'example.txt', 'second'));
}
