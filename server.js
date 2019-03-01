require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const MOVIES = require('./moviedex.json')

const app = express()

app.use(morgan('dev'))

app.use(function validateBearerToken(req, res, next){
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    // debugger
    if (!authToken || authToken.split(' ')[1] !== apiToken){
        return res.status(401).json({error: 'Unauthorized request'})
    }
    next() 
})

function handleGetMovie(req, res) {
    res.send('This is a movie!')
}

app.get('/movie', function handleGetMovie(req, res) {
    let response = MOVIES; 

    if (req.query.genre) {
        response = response.filter(movie => movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
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
