const express = require('express')
const app = express()

app.use(express.json());

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

app.post('/api/v1/papers', async (req, res)=>{
    const paper = req.body;
    console.log(paper)
    for(let requiredParam of ['title', 'author']){
        if (!paper[requiredParam]) {
            return res.status(500).json({message: `You are missing ${requiredParam}`})
        }
    }

    try{
       const newPaper = await database('papers').insert(paper, '*')
        res.status(201).json(newPaper)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

app.post('/api/v1/papers/:id/footnote', async (req, res)=>{
    const paper = await database('papers').whereRaw('id = ?', [req.params['id']])

    if (!paper[0]){
        return res.status(404).json({message: `Resource not found`})
    }

    const footnote = await database('footnotes').insert({note: req.body['note'], paper_id: req.params['id']}, '*')

    try{
       res.status(200).json(footnote)
    }catch (error){
        res.status(500).json({message: 'There was an error saving the footnote'})
    }
})

app.get('/api/v1/papers/:id', async (req, res)=>{
    console.log(req.params.id)
    const paper = await  database('papers')
                        .where('id', req.params.id)
                        .select('id', 'author', 'publisher')

    if (!paper[0]){
       return res.status(404).json({ message: 'resource not found'})
    }
    try{
        res.status(200).json(paper[0])
    }catch (error) {
        res.status(500).json({message: 'server error'})
    }

})

app.get('/api/v1/papers/:id/footnotes', async (req, res)=>{
    const paperId = req.params.id
    const paper = await database('papers').where('id', paperId)

    if (!paper[0]){
        return res.status(404).json({message: 'Resource not found'})
    }
    const footnotes = await database('footnotes').where('paper_id', paperId).select('id', 'note')

    try{
        res.status(200).json(footnotes)
    }catch (error) {
        res.status(500).json({message: 'server error'})
    }
})

app.listen(PORT, ()=>{
    console.log(`${app.locals.title} is running on port ${PORT}`)
})