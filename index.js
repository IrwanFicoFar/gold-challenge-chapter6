const express = require('express')
const bodyParser = require('body-parser')
const { Usergame , Userbiodata , UsergameHistory } = require('./models')
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

// VIEWS SUPER ADMIN LOGIN
app.get('/home', (req, res) => {
    res.render('superAdmin')
})

// VIEWS SUPER DASHBOARD
app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

// VIEWS LIST DATA USER
app.get('/listData', async (req, res) => {
    const listData = await fetch('http://localhost:6060/data')
    const data = await listData.json()
    console.log(data)
    res.render('listData', { listData: data })
})

// VIEWS DETAIL / BIODATA USER
app.get('/detail/:id', async (req, res) => {
    const resp = await fetch(`http://localhost:6060/biodata/${req.params.id}`)
    const data = await resp.json()    
    res.render('detail', { userDetail: data })    
})

// VIEWS HISTORY USER
app.get('/history/:id', async (req, res) => {
    const history = await fetch(`http://localhost:6060/data/${req.params.id}/history`)
    const data = await history.json()    
    res.render('history', { data: data })
})

// CREATE
// CREATE REGISTER USER
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


// CREATE HISTORY USER
app.post('/history', jsonParser, async (req, res) => {
    try {
        const dataUser = await UsergameHistory.create({
            game: req.body.game,
            score: req.body.score,
            rank: req.body.rank,
            UsergameId: req.body.UsergameId
        })        
        res.status(201).send(dataUser)
    } catch (error) {
        res.status(403).send('INPUT DATA FAILED')
    }
       
})



// READ
// READ ONE USERNAME
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

// READ FIND ALL USERNAME
app.get('/data', async (req, res) => {
    const data = await Usergame.findAll()
    res.send(data)
})

// READ DETAIL USER / BIODATA BY ID
app.get('/biodata/:id', async (req, res) => {
    const data = await Usergame.findByPk (req.params.id, {
        include: Userbiodata
    })

    res.send(data)
})

// READ HISTORY BY ID
app.get('/data/:id/history', async (req, res) => {
    const data = await Usergame.findByPk(req.params.id, {
        include: UsergameHistory
    }) 

    res.send(data)
})


// EDIT
// EDIT DETAIL USER / BIODATA 
app.put('/biodata/:id', jsonParser, async (req, res) => {
    try {
        const data = await Userbiodata.findByPk (req.params.id)
        data.fullname = req.body.fullname
        data.address = req.body.address
        data.age = req.body.age
        data.hobby = req.body.hobby
        data.save()
        res.status(202).send(" DATA HAS BEEN EDITED")
    } catch (error) {
        res.status(403).send(" POBIDDEN")
    }
    
})

// EDIT HISTORY USER BY ID
app.put('/history/:id', jsonParser, async (req, res) => {
    try {
        const data = await UsergameHistory.findByPk (req.params.id)
        data.game = req.body.game
        data.score = req.body.score
        data.rank = req.body.rank
        data.save()
        res.status(202).send(" DATA HAS BEEN EDITED")
    } catch (error) {
        res.status(403).send(" POBIDDEN")
    }
    
})


// DELETE
// DELETE USERNAME & DETAIL USER / BIODATA BY ID
app.delete('/data/:id', async(req,res) => {
    try {
      const dataUser = await Usergame.findByPk(req.params.id)
      const biodatas = await Userbiodata.findByPk(req.params.id)
      dataUser.destroy()
      biodatas.destroy()
      res.status(202).send('DELETED')
    } catch (error) {
      res.status(422).send('UNABLE TO DELETE DATA')
    }
  })

  // DELETE HISTORY BY ID
  app.delete('/history/:id', async(req,res) => {
    try {
      const datahistory = await UsergameHistory.findByPk(req.params.id)
      datahistory.destroy()
      res.status(202).send('DELETED')
    } catch (error) {
      res.status(422).send('UNABLE TO DELETE DATA')
    }
  })



//AUTHORIZED
app.post('/authorized', jsonParser, (req, res) => {
    const USERNAME = "irwan"
    const PASSWORD = "pastibisa"

  if(USERNAME === (req.body.username) && PASSWORD === (req.body.password)) {
    res.send("Authorized")
  }else{
    res.status(401).send("Unauthorized")
  }
})


// LISTEN 
app.listen('6060', () => {
    console.log('APP PORT:6060 IS RUNNING')
})


