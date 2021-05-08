const weather = require('../data/weather.json')
require('dotenv').config()
const superagent = require('superagent');
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY



function handleWeather(req, res) {
    try {
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
        superagent.get(weatherBitUrl).then(weatherBitData => {
            const weatherBitArray = weatherBitData.body.data.map(data => new Weather(data));
            res.send(weatherBitArray);

        }).catch(console.error)
    }
    catch (error) {
        const newArray = weather.data.map(data => new Weather(data));
        res.send(newArray);
    }

}



class Weather {
    constructor(data) {
        this.date = data.valid_date;
        this.description = data.weather.description;
    }
}

module.exports = handleWeather;