require('dotenv').config()
const superagent = require('superagent');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY


function handleMovie(req, res) {
    try {
        const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.query}`;



        superagent.get(movieUrl).then(movieDbData => {
            const movieArray = movieDbData.body.results.map(data => new Movie(data));

            res.send(movieArray)

        }).catch(console.error)


    }
    catch (error) {
        console.log(error)
    }
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