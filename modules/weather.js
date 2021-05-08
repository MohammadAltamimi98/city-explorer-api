const weather = require('../data/weather.json')
require('dotenv').config()
const superagent = require('superagent');
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY


 const cacheMemory= require('./cacheMemory');

function handleWeather(req, res) {
    try {
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;
        const lat=req.query.lat;
        const lon=req.query.lon;
        const params={
            key:WEATHER_BIT_KEY,
            lat:lat,
            lon:lon
        }

           if(cacheMemory[[lat,lon]]) {
               console.log('got weather from cache');
            res.send(cacheMemory[[lat,lon]]);
           }

           else {
               superagent.get(weatherBitUrl).query(params).then(weatherBitData => {
            const weatherBitArray = weatherBitData.body.data.map(data => new Weather(data));
            console.log('got this from superagent');
            cacheMemory[[lat,lon]]=weatherBitArray;
            res.send(weatherBitArray);

        })}}
           
    
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