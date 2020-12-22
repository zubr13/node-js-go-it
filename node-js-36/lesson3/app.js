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

// app.use((req, res, next) => {
//     res.set('Access-Control-Allow-Origin', 'localhost:8080');
//     next();
// });

// app.options('*', (req, res) => {
//     res.set('Access-Control-Allow-Methods', req.method);
//     res.set('Access-Control-Allow-Headers', JSON.stringify(req.headers));
//     res.send();
// });

app.get('/weather', validateWeatherParams, async (req, res) => {
    const { lat, lon } = req.query;

    const API_KEY = process.env.OPEN_WEATHER_API_KEY;

    const result = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await result.json();

    res.json(data);
});

function validateWeatherParams(req, res, next) {
    const {
        query: { lat, lon },
    } = req;

    const validationRules = Joi.object({
        lat: Joi.number().required(),
        lon: Joi.number().required(),
    });

    const validationResult = validationRules.validate({
        lat: parseFloat(lat),
        lon: parseFloat(lon),
    });

    if (validationResult.error) {
        return res.status(400).send(validationResult.error);
    }

    next();
}

// const badValidate = (req, res, next) => {
//     const { lat, lon } = req.query;
//     if (typeof lat !== 'string') {
//         return res.status(400).send('Lat is missed');
//     } else if (typeof lon !== 'string') {
//         return res.status(400).send('Lon is missed');
//     }

//     next();
// };

app.post('/weather', (req, res) => {});

app.listen(PORT, () => {
    console.log('Server is listening on: ', PORT);
});
