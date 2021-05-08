const express = require('express')
const app = express()
const cors = require('cors')
const weatherHandler = require('./components/weather')
const movieHandler = require('./components/movie')



const PORT = process.env.PORT || 8080

app.use(cors());
app.get('/', function (req, res) {
    res.send('Welcome to Mohammad Altamimi\s express server. This is the point where the data from two different API\'s meet.')
})


app.get('/weather', weatherHandler)
app.get('/movie', movieHandler)






app.listen(PORT)






// note: you will get an error if you use { in arrow functions like line 10} without any return statement 
//The idea is that we are targeting the json file which we required earlier then we specified the data part of it then we mapped through it creating an instance [new Weather] at every object element .
// note that 
