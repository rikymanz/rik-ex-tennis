const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const registerRoutes = require('./routes/registerRoutes')
const stringingRoutes = require('./routes/stringingRoutes')


app.use('/register', registerRoutes )
app.use('/stringing', stringingRoutes )

// risposta del server http://localhost:3002
app.listen( 3001, () => console.log('server started on 3001'))

app.use('/', (req,res) => {
  res.send('TENNIS API')
})