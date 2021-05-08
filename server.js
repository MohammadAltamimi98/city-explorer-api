const express = require('express')
const app = express()
const weather = require('./data/weather.json')
const cors = require('cors')
require('dotenv').config()
const superagent = require('superagent');
const { query } = require('express')
const weatherHandler= require('./components/weather')


const PORT = process.env.PORT || 8080
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY
const MOVIE_API_KEY=process.env.MOVIE_API_KEY


app.use(cors());
app.get('/', function (req, res) {
    res.send('Hello World')
})


app.get('/weather', weatherHandler )


app.get('/movie',function(req,res){
    try{
        const movieUrl =`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.query}`;
        
        
        superagent.get(movieUrl).then(movieDbData=>{
            const movieArray=movieDbData.body.results.map(data=> new Movie(data));
            
            res.send(movieArray)

        }).catch(console.error)
       
    }
    catch(error){
        console.log(error)
    }

    })




class Movie{
    constructor(data){
        this.title=data.original_title;
        this.image='http://image.tmdb.org/t/p/w342'+data.poster_path;
        this.releaseDate=data.release_date;
        this.rating=data.vote_average;

    }
}

app.listen(PORT)

// note: you will get an error if you use { in arrow functions like line 10} without any return statement 
//The idea is that we are targeting the json file which we required earlier then we specified the data part of it then we mapped through it creating an instance [new Weather] at every object element .
// note that 
