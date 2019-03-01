require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.use(function validateBearerToken(req, res, next){
    console.log('validate middleware')
    next() 
})

function handleGetMovie(req, res) {
    res.send('This is a movie!')
}

app.get('/movie', handleGetMovie)

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
