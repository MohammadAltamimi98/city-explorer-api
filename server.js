const express = require('express')
const app = express()
const weather = require('./data/weather.json')

app.get('/', function (req, res) {
    res.send('Hello Worldd')
})

app.get('/weather', function (req, res) {
    const arrayOfData= weather.data.map(data => new Weather(data)) 
    res.send(arrayOfData)
})

class Weather {
    constructor(data) {
        this.date = data.valid_date;
        this.description = data.weather.description;
    }
}


app.listen(3003)

// note: you will get an error if you use { in arrow functions like line 10} without any return statement 
//The idea is that we are targeting the json file which we required earlier then we specified the data part of it then we mapped through it creating an instance [new Weather] at every object element .
