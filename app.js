const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

//const input = 'Ciao'
//const crypto = require("crypto"); 
//const hash = crypto.createHash('sha256').update(input).digest('hex');


const registerRoutes = require('./routes/registerRoutes')
const stringingRoutes = require('./routes/stringingRoutes')
const usersRoutes = require('./routes/usersRoutes')

app.use('/register', registerRoutes )
app.use('/stringing', stringingRoutes )
app.use('/users', usersRoutes )


// risposta del server http://localhost:3000
app.listen( 3000, () => console.log('server started on 3000'))

app.use('/', (req,res) => {
  res.send('TENNIS API')
})