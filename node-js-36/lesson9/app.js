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
    cloud_name: process.env.STORAGE_CLOUD_NAME,
    api_key: process.env.STORAGE_API_KEY,
    api_secret: process.env.STORAGE_API_SECRET,
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp/');
    },
    filename: function (req, file, cb) {
        const { ext } = path.parse(file.originalname);
        const name = `${Date.now()}${ext}`;
        cb(null, name);
    },
});

const upload = multer({ storage });

const PORT = process.env.port || 8080;

const app = express();
app.use(express.static('uploads'));

app.post('/profile', upload.single('avatar'), async (req, res) => {
    const [file] = await imagemin([req.file.path], {
        destination: 'uploads/',
        plugins: [imageminJpegtran()],
    });

    await fsPromises.unlink(req.file.path);

    const result = await cloudinary.uploader.upload(file.destinationPath);
    console.log('result', result);

    res.send(result);
});

app.listen(PORT, () => {
    console.log('Server is listening on port: ', PORT);
});
