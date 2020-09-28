const express = require('express')
const app = express()

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.locals.title = 'Publications'



const PORT = process.env.PORT || 3000

app.get('/', (req, res)=>{
    res.send('Hello! Universe')
})

app.get('/api/v1/papers', async (req, res)=>{
    try{
        const papers = await database('papers').select()
        res.status(200).json(papers)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/v1/footnotes', async (req, res)=>{
    try{
        const footnotes = await database('footnotes').select()
        res.status(200).json(footnotes)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

app.listen(PORT, ()=>{
    console.log(`${app.locals.title} is running on port ${PORT}`)
})