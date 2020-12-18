const express = require('express');
const Joi = require('joi');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: 'localhost:8080',
    })
);

console.log(process.env.USER_NAME);

// app.use((req, res, next) => {
//     res.set('Access-Control-Allow-Origin', 'localhost:8080');
//     next();
// });

// app.options('*', (req, res) => {
//     res.set('Access-Control-Request-Headers', JSON.stringify(req.headers));
//     res.set('Access-Control-Request-Method', req.method);
//     res.status(200).send();
// });

app.post('/weather', (req, res) => {
    console.log('body', req.body);
    res.json(req.body);
});

// app.get('/weather', (req, res) => {
//     const { lat, lng } = req.query;

//     if (typeof lat !== 'string') {
//         return res.status(400).send('Validation error: lat is empty');
//     }

//     if (typeof lng !== 'string') {
//         return res.status(400).send('Validation error: lng is empty');
//     }

//     res.json(req.body);
// });

app.get('/weather', async (req, res) => {
    const { lat, lng } = req.query;

    const validationRules = Joi.object({
        lat: Joi.string().required(),
        lng: Joi.string().required(),
    });

    const validationResult = validationRules.validate(req.query);

    if (validationResult.error) {
        return res.status(400).send(validationResult.error);
    }

    const API_KEY = process.env.API_KEY;

    const result = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    );
    const data = await result.json();

    res.json(data);
});

app.listen(PORT, () => {
    console.log('Server is listening on: ', PORT);
});
