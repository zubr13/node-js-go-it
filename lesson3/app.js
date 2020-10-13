const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config()

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`);
    const data = await response.json();
    res.json({ data });
});

app.listen(PORT);