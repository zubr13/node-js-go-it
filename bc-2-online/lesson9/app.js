const path = require('path');
const { promises: fsPromises } = require('fs');

const express = require('express');
const multer = require('multer');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/');
  },
  filename: function (req, file, cb) {
    const { ext } = path.parse(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

const app = express();

app.use(express.json());
app.use(express.static('upload'));

app.post('/profile', upload.single('userAvatar'), minifyImage, (req, res) => {
  // console.log('file', req.file);
  // console.log('body', req.body);
  res.send({ file: req.file, ...req.body });
  res.status(204).send();
});

async function minifyImage(req, res, next) {
  const [file] = await imagemin([req.file.path], {
    destination: 'upload/',
    plugins: [imageminJpegtran()],
    progressive: true,
    arithmetic: true,
  });

  cloudinary.uploader.upload(file.destinationPath, function (error, result) {
    console.log(result, error);
  });

  // await fsPromises.unlink(req.file.path);

  next();
}

app.listen(PORT, () => {
  console.log('Server is listening on port: ', PORT);
});
