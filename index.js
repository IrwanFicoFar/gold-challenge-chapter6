const express = require('express')
const bodyParser = require('body-parser')
const { Usergame , Userbiodata } = require('./models')
const fetch = require('node-fetch')


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

app.get('/listData', async (req, res) => {
    const listData = await fetch('http://localhost:6060/data')
    const data = await listData.json()
    console.log(data)
    res.render('listData', { listData: data })
})

app.get('/detail/:id', async (req, res) => {
    const resp = await fetch(`http://localhost:6060/biodata/${req.params.id}`)
    const data = await resp.json()    
    res.render('detail', { userDetail: data })
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

// READ
app.get('/data/:username', async (req, res) => {
    const data = await Usergame.findOne({
        where: {
            username: req.params.username
        }
    }) 

    if(data != null) {
        res.send(data)
    } else {
        res.status(404).send("DATA NOT FOUND")
    }
 
})

app.get('/data', async (req, res) => {
    const data = await Usergame.findAll()
    res.send(data)
})

app.get('/biodata/:id', async (req, res) => {
    const data = await Usergame.findByPk (req.params.id, {
        include: Userbiodata
    })

    res.send(data)
})


// EDIT
app.put('/biodata/:id', jsonParser, async (req, res) => {
    const data = await Userbiodata.findByPk (req.params.id)
    data.fullname = req.body.fullname
    data.address = req.body.address
    data.age = req.body.age
    data.hobby = req.body.hobby
    data.save()
    res.status(202).send(" DATA HAS BEEN EDITED")
})



// DELETE

app.delete('/data/:id', async(req,res) => {
    try {
      const dataUser = await Usergame.findByPk(req.params.id)
      const biodatas = await Usergame.findByPk(req.params.id)
      dataUser.destroy()
      biodatas.destroy()
      res.status(202).send('DELETED')
    } catch (error) {
      res.status(422).send('UNABLE TO DELETE DATA')
    }
  })

app.listen('6060', () => {
    console.log('APP PORT:6060 IS RUNNING')
})

