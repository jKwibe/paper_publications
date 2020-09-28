const express = require('express')
const pg = require('pg')
const knex = require('knex')

const app = express()

const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log(`Your app is running on port ${PORT}`)
})