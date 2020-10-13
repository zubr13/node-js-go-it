const express = require('express');
const Joi = require("joi");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'localhost:8080' }));
// app.use(addAllowOriginHeaders);

const PORT = process.env.PORT || 8080;

// app.options('*', (req, res, next) => {
//     console.log('headers', req.headers);
//     res.set('Access-Control-Allow-Methods', req.method);
//     res.set('Access-Control-Allow-Headers', JSON.stringify(req.headers))
//     res.status(200).send();
// });

app.get('/weather', validateWeatherData, async (req, res) => {
    const { query: { lat, lon }} = req;
    const apiKey = process.env['OPEN_WEATHER_API_KEY'];

    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const data = await response.json();

    res.json(data);
})

// function validateWeatherData (req, res, next) {
//    const { query: { lat, lon } } = req;
//    if (typeof lat === 'string' && typeof lon === 'string') {
//        return next();
//    }
//    res.status(400).send("Validation error");
// }

function validateWeatherData (req, res, next) {
    const schema = Joi.object({
        lat: Joi.string().required(),
        lon: Joi.string().required(),
    });

    const result = schema.validate(req.query);
    console.log('result', result);

    if (result.error) {
        return res.status(400).send(result.error);
    } 

    next();
}

function addAllowOriginHeaders(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'localhost:8080');
    next();
}

app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT);
});