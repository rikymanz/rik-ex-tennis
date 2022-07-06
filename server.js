const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

//const input = 'pwd'
//const crypto = require("crypto"); 
//const hash = crypto.createHash('sha256').update(input).digest('hex');

const registerRoutes = require('./routes/registerRoutes')
const stringingRoutes = require('./routes/stringingRoutes')
const usersRoutes = require('./routes/usersRoutes')

app.use('/register', registerRoutes )
app.use('/stringing', stringingRoutes )
app.use('/users', usersRoutes )


// risposta del server http://localhost:3001
app.listen( 3001, () => console.log('server started on 3001'))

app.use('/', (req,res) => {
  res.send('TENNIS API')
})