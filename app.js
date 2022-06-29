const express = require('express')
//var cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
var cors = require('cors')

app.use(cors()) 
app.use(express.json())
//app.use(cors())

const walletsRouter = require('./routes/walletsRoutes')
app.use('/wallets', walletsRouter)

app.get('/',( req , res )=>{
    res.send('RIK-EX-COIN!!!')
})

// risposta del server http://localhost:3000
app.listen( port, () => console.log(`Listening on port ${port}!`))
