const express = require('express')
const bodyParser = require('body-parser')
const { Usergame , Userbiodata } = require('./models')

const app = express()
const jsonParser = bodyParser.json()

app.set('view engine','ejs')
app.use('/css', express.static(__dirname+'/css'))
app.use('/js', express.static(__dirname+'/js'))

// FIRST API TEST
app.get('/', (req, res) => {
    res.send('first get success')
})

// VIEWS
app.get('/home', (req, res) => {
    res.render('superAdmin')
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})


// CREATE
app.post('/register', jsonParser, async (req, res) => {

    try {
        // POST USERGAME
        const dataUser = await Usergame.create({
            username: req.body.username
        })        
        // POST USERBIODATA
        const biodata = await Userbiodata.create({
            fullname: req.body.fullname,
            address: req.body.address,
            age: req.body.age,
            hobby: req.body.hobby,
            UsergameId: dataUser.id
        })

        res.status(201).send('INSERT DATA SUCCESS')
    } catch (error) {
        res.status(409).send('USERNAME ALREADY EXIST')
    }

})




app.listen('6060', () => {
    console.log('APP PORT:6060 IS RUNNING')
})

