require("./greeting");
const config = require("./config");
const fs = require("fs");
const path = require("path");
// console.log(config);
// console.log("Hello world");

// console.log(name);

// console.log(process.env.NODE_ENV);

console.log(+process.argv[2] + +process.argv[3]);

//const data = fs.readFileSync("greeting.js", "utf-8");
// console.log("data", data);

fs.readFile("greeting.js", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});

fs.writeFile("test.js", "This is writing file", (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
});

console.log(path.join("./some-url/info/user", "../..", "./id"));
throw new Error("Server is down");

console.log("dirname", __dirname);
console.log("filename", __filename);
console.log(`${__dirname}/config.js`);
