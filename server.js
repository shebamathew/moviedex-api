require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const MOVIES = require('./moviedex.json')

const app = express()

app.use(morgan('dev'))

app.use(function validateBearerToken(req, res, next){
    console.log('validate middleware')
    next() 
})

function handleGetMovie(req, res) {
    res.send('This is a movie!')
}

app.get('/movie', function handleGetMovie(req, res) {
    let response = MOVIES; 

    if (req.query.genre) {
        response = response.filter(movie => movie.genres.toLowerCase().includes(req.query.genre.toLowerCase())
        )
    }

    if (req.query.country) {
        response = response.filter(movie => movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
    }

    res.json(response)
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
