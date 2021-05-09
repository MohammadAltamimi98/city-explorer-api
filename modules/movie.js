require('dotenv').config()
const { query } = require('express');
const superagent = require('superagent');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY

const cacheMemory = require('./cacheMemory')

function handleMovie(req, res) {

    try {
        const movieUrl = `https://api.themoviedb.org/3/search/movie`;
        const country = req.query.query;
        const params = {
            api_key: MOVIE_API_KEY,
            query: country
        };
        console.log(cacheMemory);



        if (cacheMemory[country]) {
            console.log(' we got the movie from the cache');

            res.status(200).send(cacheMemory[country])
        }

        else {
            superagent.get(movieUrl).query(params).then(movieDbData => {
                const movieArray = movieDbData.body.results.map(data => new Movie(data));
                cacheMemory[country] = movieArray;
                movieArray.length=12; // to set the array response we get to only 12 movies.
                console.log(' we got the movie from the api');
                res.send(movieArray)
            })
        }


    }
    catch (error) { console.log(error) }

}






class Movie {
    constructor(data) {
        this.title = data.original_title;
        this.image = 'http://image.tmdb.org/t/p/w342' + data.poster_path;
        this.releaseDate = data.release_date;
        this.rating = data.vote_average;

    }
   
}


module.exports = handleMovie;