const express = require('express')
const app = express()
const weather = require('./data/weather.json')
const cors= require ('cors')
require('dotenv').config()
const superagent = require('superagent');


const PORT=process.env.PORT || 8080
const WEATHER_BIT_KEY=process.env.WEATHER_BIT_KEY


app.use(cors());
app.get('/', function (req, res) {
    res.send('Hello World')
})


app.get('/weather', function (req, res) {
const weatherBitUrl=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${38.123}&lon=${-78.543}`;
superagent.get(weatherBitUrl).then (data=>{
    return res.send(data.body)
}).catch(console.error);
    
    
})

class Weather {
    constructor(data) {
        this.date = data.valid_date;
        this.description = data.weather.description;
    }
}

app.listen(PORT)

// note: you will get an error if you use { in arrow functions like line 10} without any return statement 
//The idea is that we are targeting the json file which we required earlier then we specified the data part of it then we mapped through it creating an instance [new Weather] at every object element .
// note that 
