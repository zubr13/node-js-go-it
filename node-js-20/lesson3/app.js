const express = require('express');
const Joi = require('joi');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
const jsonMiddleware = express.json();
app.use(jsonMiddleware);
app.use(cors({ origin: 'localhost:8080' }));

// app.options('*', (req, res) => {
//     res.set('Access-Control-Allow-Methods', req.method);
//     res.set(
//         'Access-Control-Allow-Headers',
//         JSON.stringify(Object.keys(req.headers))
//     );
//     res.send();
// });

// app.use((req, res, next) => {
//     res.set('Access-Control-Allow-Origin', 'localhost:8080');
//     next();
// });

app.get('/weather', validateWeatherData, async (req, res) => {
    const {
        query: { lat, lng },
    } = req;
    const API_KEY = process.env.OPEN_WEATHER_API_KEY;
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    );
    const data = await response.json();

    res.json(data);
});

app.post('/weather', (req, res) => {
    res.json({ data: req.body });
});

function validateWeatherData(req, res, next) {
    // const {
    //     query: { lat, lng },
    // } = req;

    // if (typeof lat !== 'string' || typeof lng !== 'string') {
    //     return res.status(400).send('Validation error');
    // }

    const validationSchema = Joi.object({
        lat: Joi.string().required(),
        lng: Joi.string().required(),
    });

    const validationResult = validationSchema.validate(req.query);

    if (validationResult.error) {
        return res.status(400).send(validationResult.error);
    }

    next();
}

app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
});
