const express = require('express')
const pg = require('pg')

const app = express()

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.locals.title = 'Publications'



const PORT = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send('Hello! Universe')
})


app.listen(PORT, ()=>{
    console.log(`${app.locals.title} is running on port ${PORT}`)
})