const express = require("express");
const multer = require('multer');
const dotenv = require("dotenv");
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const cloudinary = require('cloudinary').v2;

const { promises: fsPromises } = require('fs');
const path = require("path");

dotenv.config();

console.log(__dirname);
console.log(__filename);

cloudinary.config({ 
    cloud_name: process.env.STORAGE_CLOUD_NAME, 
    api_key: process.env.STORAGE_API_KEY, 
    api_secret: process.env.STORAGE_API_SECRET, 
  });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'temp/')
    },
    filename: function (req, file, cb) {
      console.log('file', file);
      // const extension = path.parse(file.originalname).ext;
      const extension = '.exe';
      console.log('extension', extension)
      cb(null, `${Date.now()}${extension}`)
    }
  })

const upload = multer({ storage });

const PORT = process.env.PORT || 8000;

const app = express();

app.post('/profile', upload.single('avatar'), minifyImage, (req, res) => {
    console.log('req file', req.file);
    console.log('body', req.body);

    res.json(req.file);
});

app.use(express.static('uploads'));

app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});

async function minifyImage (req, res, next) {
    const [file] = await imagemin([req.file.path], {
        destination: 'uploads',
        plugins: [
            imageminJpegtran(),
        ]
    });
    cloudinary.uploader.upload(file.destinationPath, (error, result) => {
        console.log(result, error)
    });

    await fsPromises.unlink(req.file.path);
    next();
}