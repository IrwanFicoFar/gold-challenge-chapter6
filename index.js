const express = require('express')
const bodyParser = require('body-parser')
const { Usergame } = require('./models')

const app = express()
const jsonParser = bodyParser.json()

// FIRST API TEST
app.get('/', (req, res) => {
    res.send('first get success')
})

// CREATE
// POST USERGAME
app.post('/register', jsonParser, async (req, res) => {

    try {
        const data = await Usergame.create({
            username: req.body.username
        })
    
        res.status(201).send(data)
    } catch (error) {
        res.status(409).send('USERNAME ALREADY EXIST')
    }

})






app.listen('6060', () => {
    console.log('APP PORT:6060 IS RUNNING')
})

